module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          // --no-sync: Prevents UV from trying to "fix" our stable environment with nightly builds
          // --precision bf16: Stops the digital "grain" noise
          // --offload_threshold 15: Forces your 20GB card to keep both 4B models in VRAM for clarity
          "uv run --no-sync python -m acestep.acestep_v15_pipeline --port {{port}} --init_service true --init_llm true --backend pt --lm_model_path acestep-5Hz-lm-4B --precision bf16 --offload_threshold 15"
        ],
        on: [{ event: "/(http:\/\/[0-9.:]+)/", done: true }]
      }
    }
  ]
}
