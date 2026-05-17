module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        env: { 
          "PYTHONPATH": ".",                    // Tells Python to look in the app folder
          "PYTHONNOUSERSITE": "1",              // ISOLATION: Ignores broken Insider system paths
          "GPU_OFFLOAD_THRESHOLD": "15.0",      // PERFORMANCE: Fixes the 0.14 garbage audio
          "ACE_PRECISION": "bf16",              // QUALITY: Removes digital noise grain
          "LM_MODEL_CHOICE": "acestep-5Hz-lm-4B", // BRAIN: Uses the high-fidelity planner
          "UV_CERT_CHECK": "false"              // NETWORK: Bypasses Windows SSL blocks
        },
        path: "app",
        message: [
          // Use double-backslashes for Windows path safety
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
