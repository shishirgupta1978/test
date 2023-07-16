from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
import torch
from PIL import Image
import os
import pickle

def predict_step(image_paths):
    images = []

    model_path = "nlpconnect/vit-gpt2-image-captioning"
    pickle_file = "img_model.pickle"

    if os.path.exists(pickle_file):
        # Load the model from the pickle file
        print("Loading model...")
        with open(pickle_file, "rb") as f:
            model = pickle.load(f)
    else:
        # Initialize and save the model
        print("Downloading and saving model...")
        model = VisionEncoderDecoderModel.from_pretrained(model_path)
        with open(pickle_file, "wb") as f:
            pickle.dump(model, f)

    feature_extractor = ViTImageProcessor.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
    tokenizer = AutoTokenizer.from_pretrained("nlpconnect/vit-gpt2-image-captioning")

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    max_length = 20
    num_beams = 8
    gen_kwargs = {"max_length": max_length, "num_beams": num_beams}

    for image_path in image_paths:
        i_image = Image.open(image_path)
        if i_image.mode != "RGB":
            i_image = i_image.convert(mode="RGB")

    images.append(i_image)

    pixel_values = feature_extractor(images=images, return_tensors="pt").pixel_values
    pixel_values = pixel_values.to(device)

    output_ids = model.generate(pixel_values, **gen_kwargs)

    preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)
    preds = [pred.strip() for pred in preds]
    return preds

if __name__ == "__main__":
    print(predict_step(['/home/root1/Desktop/ACTBIO8694_org.docx/word/media/image11.jpeg']))