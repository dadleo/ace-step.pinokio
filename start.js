module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          // The --no-sync flag is the key to bypassing the "invalid peer certificate" errors
          "uv run --no-sync acestep --port {{port}} --init_service true --init_llm true --backend pt --lm_model_path acestep-5Hz-lm-4B --precision bf16 --offload_threshold 15"
        ],
        on: [{
          event: "/(http:\/\/[0-9.:]+)/",
          done: true
        }]
      }
    }
  ]
}
