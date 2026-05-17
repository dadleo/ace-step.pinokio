module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "uv run --no-sync python -m acestep.acestep_v15_pipeline --port {{port}} --init_service true --init_llm true --backend pt --device cuda --use_flash_attention true"
        ],
        on: [{
          event: "/(http:\\/\\/[0-9.:]+)/",
          done: true
        }]
      }
    }
  ]
}
