module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        env: { },
        path: "app",
        message: [
          "uv run acestep --port {{port}} --init_service true --init_llm true --backend pt --lm_model_path acestep-5Hz-lm-4B --precision bf16 --offload_threshold 15"
        ],
        on: [{
          event: "/(http:\/\/[0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
