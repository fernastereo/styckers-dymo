<script setup>
  import { ref, onMounted, toRefs, watch } from 'vue';
  import { toast } from 'vue-sonner';
  import { Search, Printer, RotateCw } from 'lucide-vue-next';
  import PlanosComponent from './ui/PlanosComponent.vue';
  import SelectComponent from './ui/SelectComponent.vue';
  import { useDymo } from '../composables/useDymo';
  import stickerCuraduria2bq_1 from '../assets/styckers/curaduria2bq_1.xml?url';
  import stickerCuraduria2bq_2 from '../assets/styckers/curaduria2bq_2.xml?url';

  const { isDymoLoaded, initializeDymo, printers, error } = toRefs(useDymo());

  // necesito una variable de estado que contenga todos los datos del Formulario
  const formData = ref({
    idRadicacion: "",
    numeroRadicacion: "",
    fechaRadicacion: "",
    licencia: "",
    modalidad: "",
    solicitante: "",
    resolucion: "",
    fechaResolucion: "",
    arquitecto: "",
    ingeniero: "",
    planosArquitectonicos: { checked: false, numeroPlanos: 0, descripcion: '' },
    planosEstructurales: { checked: false, numeroPlanos: 0, descripcion: '' },
    planosUrbanismo: { checked: false, numeroPlanos: 0, descripcion: '' },
    planosSubdivision: { checked: false, numeroPlanos: 0, descripcion: '' },
    otrosPlanos: { checked: false, numeroPlanos: 0, descripcion: '' },
    incluirFirmaIngeniero: false,
  });

  // Variables reactivas para almacenar las imágenes generadas
  const previewImage1 = ref('');
  const previewImage2 = ref('');

  // Lista de profesionales
  const arquitectos = [
    "DANIEL CABALLERO",
    "DIEGO RUIDIAZ",
    "ERNESTO FERRER VILLANUEVA",
    "JAIME MAESTRE",
    "JUAN DURAN PEÑARANDA",
    "KAROLINE JIMENEZ BRACAMONTE",
    "MARTHA HERRERA"
  ];

  const ingenieros = [
    "ALEXANDER CARRILLO ESCALANTE",
    "WALTER TOVAR COQUIES",
    "YEIBER VIDES VIDAL"
  ];

  onMounted(async () => {
    getDataParams()
    const success = await initializeDymo.value();
    
    if (success) {
      toast.success("DYMO inicializado correctamente");
      console.log('Impresoras encontradas:', printers.value.length);
    } else {
      toast.error("Error al inicializar DYMO");
    }

    if (!isDymoLoaded.value) {
      toast.error("Dymo no está cargado");
      return;
    }

    await generateSticker(stickerCuraduria2bq_1, "PLANOS ARQUITECTONICOS", 1)
    await generateSticker(stickerCuraduria2bq_2, "PLANOS ARQUITECTONICOS", 2)
  });

  const generateSticker = async (stickerXmlUrl, tipoPlano, imageIndex = 1, printOptions) => {
    try {
      const response = await fetch(stickerXmlUrl);
      const xmlContent = await response.text();
      const label = dymo.label.framework.openLabelXml(xmlContent);
      
      //actualizar datos fijos del sticker
      label.setObjectText('TEXTO', "LILIA MARGARITA AMAYA NUÑEZ");
      label.setObjectText('TEXTO_1', "CURADORA URBANA N° 2 DE BARRANQUILLA");

      if (imageIndex === 1) {
        label.setObjectText('TEXTO_3', "NOMBRE: " + formData.value.arquitecto);
        if (formData.value.incluirFirmaIngeniero) {
          label.setObjectText('INGENIERO', "INGENIERO REVISOR PROYECTO ESTRUCTURAL");
          label.setObjectText('NOMINGENIERO', formData.value.ingeniero);
          label.setObjectText('FIRMAINGENIERO', "FIRMA:__________________________________________");
        }
      } else if (imageIndex === 2) {
        label.setObjectText('TEXTO_3', tipoPlano + " - RAD: " + formData.value.numeroRadicacion);
        label.setObjectText('TEXTO_5', "RESOLUCION N°: " + formData.value.resolucion + " DE " + formData.value.fechaResolucion);
        label.setObjectText('QR', "https://web-curadurias.s3-us-west-1.amazonaws.com/2bq/resol/" + formData.value.idRadicacion + ".pdf");
      }

      if (printOptions?.print && printOptions?.copies > 0) {
        console.log('imprimiendo');
        label.print(printers.value[0].name);
        console.log('imprimido');
        return
      }
 
      updatePreview(label, imageIndex);
    } catch (error) {
      console.error('Error loading sticker XML:', error);
      toast.error('Error al cargar el sticker');
    }
  }

  const updatePreview = (label, imageIndex = 1) => {
    if (!label)
      return;

    const pngData = label.render();
    
    const imageData = "data:image/png;base64," + pngData;
    
    // Asignar la imagen a la variable reactiva correspondiente
    if (imageIndex === 1) {
      previewImage1.value = imageData;
    } else if (imageIndex === 2) {
      previewImage2.value = imageData;
    }
    
    return imageData;
  }

  const getDataParams = () => {
    const urlParams = new URLSearchParams(window.location.search)
  
    // Asignar valores del formData
    if (urlParams.get('idradicacion')) {
      formData.value.idRadicacion = urlParams.get('idradicacion')
    }
    if (urlParams.get('numeroradicacion')) {
      formData.value.numeroRadicacion = urlParams.get('numeroradicacion')
    }
    if (urlParams.get('fecharadicacion')) {
      formData.value.fechaRadicacion = urlParams.get('fecharadicacion')
    }
    if (urlParams.get('licencia')) {
      formData.value.licencia = urlParams.get('licencia')
    }
    if (urlParams.get('modalidad')) {
      formData.value.modalidad = urlParams.get('modalidad')
    }
    if (urlParams.get('solicitante')) {
      formData.value.solicitante = decodeURIComponent(urlParams.get('solicitante'))
    }
    if (urlParams.get('resolucion')) {
      formData.value.resolucion = urlParams.get('resolucion')
    }
    if (urlParams.get('fecharesolucion')) {
      formData.value.fechaResolucion = urlParams.get('fecharesolucion')
    }
    if (urlParams.get('arquitecto')) {
      formData.value.arquitecto = decodeURIComponent(urlParams.get('arquitecto'))
    }
    if (urlParams.get('ingeniero')) {
      formData.value.ingeniero = decodeURIComponent(urlParams.get('ingeniero'))
    }

  }

  // Watcher para detectar cambios en el checkbox de firma del ingeniero
  watch(() => formData.value.incluirFirmaIngeniero, (newValue, oldValue) => {    
    // Regenerar el sticker 1 cuando cambie el estado del checkbox
    if (isDymoLoaded.value) {
      generateSticker(stickerCuraduria2bq_1, 1);
    }
  });

  // Watcher para detectar cambios en el arquitecto
  watch(() => formData.value.arquitecto, (newValue) => {    
    // Regenerar el sticker 1 cuando cambie el arquitecto
    if (isDymoLoaded.value && newValue) {
      generateSticker(stickerCuraduria2bq_1, 1);
    }
  });

  // Watcher para detectar cambios en el ingeniero
  watch(() => formData.value.ingeniero, (newValue) => {
    // Regenerar el sticker 1 cuando cambie el ingeniero
    if (isDymoLoaded.value && newValue) {
      generateSticker(stickerCuraduria2bq_1, 1);
    }
  });

  // Watcher para detectar cambios en campos del sticker 2
  watch([
    () => formData.value.numeroRadicacion,
    () => formData.value.resolucion,
    () => formData.value.fechaResolucion,
    () => formData.value.idRadicacion
  ], () => {    
    // Regenerar el sticker 2 cuando cambien estos campos
    if (isDymoLoaded.value) {
      generateSticker(stickerCuraduria2bq_2, 2);
    }
  });

  const handlePrint = () => {
    if (formData.value.planosArquitectonicos.checked) {
      generateSticker(stickerCuraduria2bq_1, "PLANOS ARQUITECTONICOS", 1, { print: true, copies: formData.value.planosArquitectonicos.numeroPlanos });
      generateSticker(stickerCuraduria2bq_2, "PLANOS ARQUITECTONICOS", 2, { print: true, copies: formData.value.planosArquitectonicos.numeroPlanos });
    }
    if (formData.value.planosEstructurales.checked) {
      generateSticker(stickerCuraduria2bq_1, "PLANOS ESTRUCTURALES", 2, { print: true, copies: formData.value.planosEstructurales.numeroPlanos });
      generateSticker(stickerCuraduria2bq_2, "PLANOS ESTRUCTURALES", 2, { print: true, copies: formData.value.planosEstructurales.numeroPlanos });
    }
    if (formData.value.planosUrbanismo.checked) {
      generateSticker(stickerCuraduria2bq_1, "PLANOS URBANISMO", 2, { print: true, copies: formData.value.planosUrbanismo.numeroPlanos });
      generateSticker(stickerCuraduria2bq_2, "PLANOS URBANISMO", 2, { print: true, copies: formData.value.planosUrbanismo.numeroPlanos });
    }
    if (formData.value.planosSubdivision.checked) {
      generateSticker(stickerCuraduria2bq_1, "PLANOS SUBDIVISION", 2, { print: true, copies: formData.value.planosSubdivision.numeroPlanos });
      generateSticker(stickerCuraduria2bq_2, "PLANOS SUBDIVISION", 2, { print: true, copies: formData.value.planosSubdivision.numeroPlanos });
    }
    if (formData.value.otrosPlanos.checked) {
      generateSticker(stickerCuraduria2bq_1, formData.value.otrosPlanos.descripcion, 2, { print: true, copies: formData.value.otrosPlanos.numeroPlanos });
      generateSticker(stickerCuraduria2bq_2, formData.value.otrosPlanos.descripcion, 2, { print: true, copies: formData.value.otrosPlanos.numeroPlanos });
    }
  };
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex gap-1 justify-center flex-1">
      <div class="bg-background py-4 px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <div class="bg-card rounded-lg shadow-sm border border-gray-300 p-2 sm:px-8 sm:py-4">
              <div class="mb-2 flex justify-between items-center">
                <h1 class="text-xl font-bold">
                  Impresión de Stickers Licencias
                </h1>
                <span :class="`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium inset-ring ${isDymoLoaded ? 'bg-green-50 text-green-700 inset-ring-green-600/20' : 'bg-red-50 text-red-700 inset-ring-red-600/20'}`">
                  {{ isDymoLoaded ? 'Impresora Disponible' : 'Impresora no Disponible' }}
                </span>

              </div>

              <form class="space-y-1">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-1">
                    <label htmlFor="numeroRadicacion" class="block text-xs font-medium">
                      Número de Radicación
                    </label>
                    <input 
                      id="numeroRadicacion" 
                      type="text"
                      placeholder="Ej: RAD-2024-001"
                      class="w-full px-3 py-0.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                      v-model="formData.numeroRadicacion"
                    />
                  </div>

                  <div class="space-y-1">
                    <label htmlFor="fechaRadicacion" class="block text-xs font-medium">
                      Fecha de Radicación
                    </label>
                    <input 
                      id="fechaRadicacion" 
                      type="date"
                      class="w-full px-3 py-0.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                      v-model="formData.fechaRadicacion"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-1">
                    <label htmlFor="licencia" class="block text-xs font-medium">
                      Licencia
                    </label>
                    <input 
                      id="licencia" 
                      type="text"
                      placeholder="Número de licencia"
                      class="w-full px-3 py-0.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                      v-model="formData.licencia"
                    />
                  </div>

                  <div class="space-y-1">
                    <label htmlFor="modalidad" class="block text-xs font-medium">
                      Modalidad
                    </label>
                    <input 
                      id="modalidad" 
                      type="text"
                      placeholder="Modalidad del proyecto"
                      class="w-full px-3 py-0.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                      v-model="formData.modalidad"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <label htmlFor="solicitante" class="block text-xs font-medium">
                    Solicitante
                  </label>
                  <input 
                    id="solicitante" 
                    type="text"
                    placeholder="Nombre completo del solicitante"
                    class="w-full px-3 py-0.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                    v-model="formData.solicitante"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-1">
                    <label htmlFor="resolucion" class="block text-xs font-medium">
                      Resolución
                    </label>
                    <input 
                      id="resolucion" 
                      type="text"
                      placeholder="Número de resolución"
                      class="w-full px-3 py-0.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                      v-model="formData.resolucion"
                    />
                  </div>

                  <div class="space-y-1">
                    <label htmlFor="fechaResolucion" class="block text-xs font-medium">
                      Fecha de Resolución
                    </label>
                    <input 
                      id="fechaResolucion" 
                      type="date"
                      class="w-full px-3 py-0.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                      v-model="formData.fechaResolucion"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectComponent label="Arquitecto" :options="arquitectos" v-model="formData.arquitecto" />
                  <SelectComponent label="Ingeniero" :options="ingenieros" v-model="formData.ingeniero" />
                </div>

                <div class="pt-1">
                  <h2 class="text-lg font-semibold mb-1">
                    Información de Planos
                  </h2>
                  
                  <div class="space-y-1">
                    <PlanosComponent titulo="Planos Arquitectónicos" :showDescription=false v-model="formData.planosArquitectonicos" />
                    <PlanosComponent titulo="Planos Estructurales" :showDescription=false v-model="formData.planosEstructurales"/>
                    <PlanosComponent titulo="Planos de Urbanismo" :showDescription=false v-model="formData.planosUrbanismo"/>
                    <PlanosComponent titulo="Planos de Subdivisión" :showDescription=false v-model="formData.planosSubdivision"/>
                    <PlanosComponent titulo="Otros Planos" :showDescription=true v-model="formData.otrosPlanos"/>
                    <div className="flex items-center space-x-2 mt-2">
                      <input 
                        :id="incluirFirmaIngeniero"
                        type="checkbox"
                        v-model="formData.incluirFirmaIngeniero"
                        :checked="formData.incluirFirmaIngeniero"
                        className="w-4 h-4 text-primary bg-background border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                      />
                      <label 
                        :htmlFor="incluirFirmaIngeniero"
                        className="text-xs font-medium text-foreground cursor-pointer"
                      >
                        Incluir Firma del Ingeniero
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
      </div>
      <div class="min-w-1/3 bg-background py-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="bg-card rounded-lg shadow-sm border border-gray-300 p-2 sm:px-8 sm:py-4">
            <div class="mb-2">
              <div class="flex justify-between items-center mb-8">
                <h1 class="text-xl font-bold">
                  Vista Previa
                </h1>
                <button 
                  type="button"
                  @click="handlePrint"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  <Printer class="mr-2 h-4 w-4" />
                  Imprimir
                </button>
              </div>
              <div class="grid mt-4 grid-cols-1 gap-6">
                <div class="space-y-1">
                  <div id="labelImageDiv" class="h-52 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                    <img id="labelImage1" :src="previewImage1" alt="label preview" v-if="previewImage1" class="max-h-full max-w-full object-contain"/>
                    <div v-else class="text-gray-400 text-sm">Vista previa no disponible</div>
                  </div>
                </div>
                <div class="space-y-1">
                  <div id="labelImageDiv" class="h-52 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                    <img id="labelImage2" :src="previewImage2" alt="label preview" v-if="previewImage2" class="max-h-full max-w-full object-contain"/>
                    <div v-else class="text-gray-400 text-sm">Vista previa no disponible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <!-- Footer -->
    <footer class="bg-gray-100 border-t border-gray-200 py-2 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Desarrollado por 
            <a 
              href="https://fernandocueto.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-all duration-300 ease-in-out"
            >
              Fernando E. Cueto
            </a>
          </p>
          <p class="text-xs text-gray-500 mt-1">
            <a 
              href="https://fernandocueto.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-indigo-600 hover:underline transition-all duration-300 ease-in-out"
            >
              fernandocueto.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
</style>