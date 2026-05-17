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
          // 1. Force the stable foundation that works with Windows and your eGPU
          "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu124",
          // 2. Fix the HfFolder error by pinning a compatible hub version
          "uv pip install huggingface_hub==0.24.3",
          // 3. Install the specific torchao that works with 2.5.1 (Enables high-precision math)
          "uv pip install torchao==0.6.1",
          // 4. Install the rest of the dependencies BUT DO NOT allow them to update Torch
          "uv pip install -r requirements.txt --no-deps"
        ]
      }
    }
  ]
}
