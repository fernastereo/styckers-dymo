// src/composables/useDymo.js
import { ref } from 'vue'

export function useDymo() {
  const isDymoLoaded = ref(false)
  const printers = ref([])
  const error = ref(null)


  const initializeDymo = async () => {    
    // Verificar si Dymo está disponible
    try {
      const detectedPrinters = await dymo.label.framework.getPrintersAsync()

      if (detectedPrinters.length == 0) {
        error.value = 'No se encontraron impresoras DYMO'
        isDymoLoaded.value = false
        return false
      }

      printers.value = detectedPrinters
      isDymoLoaded.value = detectedPrinters[0].isConnected
      
      return true
    } catch (e) {
      error.value = `Error al cargar impresoras: ${e.message}`
      isDymoLoaded.value = false
      return false
    }
  }

  const detectPrinters = async () => {
    if (!dymoFramework.value) throw new Error('Dymo no está cargado')
    return await dymoFramework.value.label.framework.getPrinters()
  }

  const printLabel = async (printerName, labelXml) => {
    if (!dymoFramework.value) throw new Error('Dymo no está cargado')
    return await dymoFramework.value.label.framework.printLabel(printerName, labelXml)
  }

  return {
    isDymoLoaded,
    printers,
    error,
    initializeDymo
  }
}
