module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/ace-step/ACE-Step-1.5.git app"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "uv sync",
          // Force stable Torch 2.5.1 (Verified for ACE-Step 1.5)
          "uv pip install torch==2.5.1 torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124",
          // Force stable TorchAO to restore C++ extensions
          "uv pip install torchao==0.6.1"
        ]
      }
    },
    {
      method: "fs.link",
      params: {
        drive: {
          checkpoints: "app/checkpoints"
        },
        peers: [
          "https://github.com/cocktailpeanut/ace-step-ui.pinokio.git",
          "https://github.com/cocktailpeanut/ace-step.pinokio.git"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "uv run acestep-download"
        ]
      }
    }
  ]
}
