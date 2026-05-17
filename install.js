module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: ["git clone https://github.com/ace-step/ACE-Step-1.5.git app"]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "uv venv",
          // 1. Force the Stable Foundation (Fixes the current OSError/Crash)
          "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu124",
          // 2. Lock the Hub version (Fixes the HfFolder and is_offline_mode errors)
          "uv pip install huggingface_hub==0.24.3 torchao==0.6.1",
          // 3. Install the app logic without letting it update Torch
          "uv pip install transformers diffusers accelerate librosa soundfile einops omegaconf pytorch-lightning pydantic-settings gradio==5.6.0 loguru fastapi diskcache uvicorn numba vector-quantize-pytorch einx toml peft lycoris-lora tensorboard typer-slim pytorch-wavelets pywavelets matplotlib scipy",
          // 4. Register the app
          "uv pip install -e . --no-deps"
        ]
      }
    }
  ]
}
