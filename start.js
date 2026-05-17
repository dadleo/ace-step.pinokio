module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        // We inject the "Studio" settings directly into the environment
        env: { 
          "GPU_OFFLOAD_THRESHOLD": "15.0", // Forces your 20GB card to stay in VRAM
          "ACE_PRECISION": "bf16",         // Forces high-fidelity math
          "LM_MODEL_CHOICE": "acestep-5Hz-lm-4B" // Forces the high-end planner
        },
        path: "app",
        message: [
          "uv run --no-sync python -m acestep.acestep_v15_pipeline --port {{port}} --init_service true --init_llm true --backend pt --device cuda"
        ],
        on: [{ event: "/(http:\/\/[0-9.:]+)/", done: true }]
      }
    }
  ]
}
