module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        env: { 
          "PYTHONPATH": ".", 
          "GPU_OFFLOAD_THRESHOLD": "15.0",      // FORCES the model to stay in VRAM
          "ACE_PRECISION": "bf16",              // REMOVES digital grain noise
          "LM_MODEL_CHOICE": "acestep-5Hz-lm-4B", // USES the high-fidelity planner
          "UV_CERT_CHECK": "false"
        },
        path: "app",
        message: [
          ".venv\\Scripts\\python.exe -m acestep.acestep_v15_pipeline --port {{port}} --init_service true --init_llm true --backend pt --device cuda"
        ],
        on: [{ event: "/(http:\/\/[0-9.:]+)/", done: true }]
      }
    },
    {
      method: "local.set",
      params: { url: "{{input.event[1]}}" }
    }
  ]
}
