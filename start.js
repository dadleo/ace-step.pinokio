module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          // --no-sync: Bypasses the SSL/Linux wheel errors
          // --precision bf16: Forces the high-fidelity math the SFT model needs
          // --offload_threshold 15: Locks the 4B Planner in VRAM (Fixes alignment)
          "uv run --no-sync python -m acestep.acestep_v15_pipeline --port {{port}} --init_service true --init_llm true --backend pt --lm_model_path acestep-5Hz-lm-4B --precision bf16 --offload_threshold 15"
        ],
        on: [{
          event: "/(http:\/\/[0-9.:]+)/",
          done: true
        }]
      }
    }
  ]
}
