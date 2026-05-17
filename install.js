module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        env: { "UV_CERT_CHECK": "false" },
        message: ["git clone -c http.sslVerify=false https://github.com/ace-step/ACE-Step-1.5.git app"]
      }
    },
    {
      method: "shell.run",
      params: {
        env: { "UV_CERT_CHECK": "false" },
        path: "app",
        message: [
          "uv venv",
          // Force the Stable Windows foundation that matches official demos
          "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu124",
          // Install the Hub and C++ Kernels (Enables SDE/ADG without noise)
          "uv pip install huggingface_hub==0.24.3 torchao==0.6.1 gradio==5.6.0",
          // Install everything else but DON'T let it update Torch
          "uv pip install transformers diffusers accelerate librosa soundfile einops omegaconf pytorch-lightning pydantic-settings loguru fastapi diskcache uvicorn numba vector-quantize-pytorch einx toml peft lycoris-lora tensorboard typer-slim pytorch-wavelets pywavelets matplotlib scipy",
          "uv pip install -e . --no-deps"
        ]
      }
    }
  ]
}
