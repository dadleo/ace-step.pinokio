module.exports = {
  run: [
    {
      method: "shell.run",
      params: { message: ["git clone https://github.com/ace-step/ACE-Step-1.5.git app"] }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "uv venv",
          // Force Stable Windows Torch & CUDA 12.4
          "uv pip install torch==2.5.1 torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124",
          // Restore high-precision math kernels (Fixes "Pure Noise" in ADG/SDE)
          "uv pip install torchao==0.6.1",
          // Install core app requirements while ignoring the broken nightly/linux wheels
          "uv pip install transformers diffusers accelerate gradio==5.6.0 huggingface_hub==0.24.3 librosa soundfile einops omegaconf pytorch-lightning pydantic-settings numba vector-quantize-pytorch"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: ["uv run acestep-download"]
      }
    }
  ]
}
