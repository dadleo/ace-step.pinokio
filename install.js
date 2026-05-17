module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        // This block bypasses the SSL/Revocation error for the whole process
        env: {
          "GIT_SSL_NO_VERIFY": "true",
          "UV_CERT_CHECK": "false"
        },
        message: [
          "git clone -c http.sslVerify=false https://github.com/ace-step/ACE-Step-1.5.git app"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        env: { "UV_CERT_CHECK": "false" },
        path: "app",
        message: [
          "uv venv",
          // 1. Force the Stable Foundation (Fixes the current audio driver crashes)
          "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu124",
          // 2. Lock Hub and Kernels (Fixes HfFolder error and ADG/SDE Noise)
          "uv pip install huggingface_hub==0.24.3 torchao==0.6.1",
          // 3. Install core logic WITHOUT letting it touch Torch
          "uv pip install transformers diffusers accelerate librosa soundfile einops omegaconf pytorch-lightning pydantic-settings gradio==5.6.0 loguru fastapi diskcache uvicorn numba vector-quantize-pytorch einx toml peft lycoris-lora tensorboard typer-slim pytorch-wavelets pywavelets matplotlib scipy",
          // 4. Register the package locally
          "uv pip install -e . --no-deps"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        env: { "UV_CERT_CHECK": "false" },
        path: "app",
        message: ["uv run --no-sync python -m acestep.model_downloader"]
      }
    }
  ]
}
