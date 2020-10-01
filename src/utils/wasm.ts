export const wasmBrowserInstantiate = async (
  wasmModuleUrl: string,
  importObject: any
) => {
  // Check if the browser supports streaming instantiation
  if (WebAssembly.instantiateStreaming) {
    // Fetch the module, and instantiate it as it is downloading
    return WebAssembly.instantiateStreaming(
      fetch(wasmModuleUrl),
      importObject
    );
  } else {
    // Fallback to using fetch to download the entire module
    // And then instantiate the module
    const wasmArrayBuffer = await fetch(wasmModuleUrl).then((response) =>
      response.arrayBuffer()
    );
    return WebAssembly.instantiate(wasmArrayBuffer, importObject);
  }
};

export async function reset(
  go: any,
  wasm: WebAssembly.WebAssemblyInstantiatedSource
) {
  wasm.instance = await WebAssembly.instantiate(wasm.module, go.importObject); // reset instance
}
