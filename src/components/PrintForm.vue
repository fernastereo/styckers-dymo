<script setup>
  import { ref } from 'vue';
  import { toast } from 'vue-sonner';
  import { Search, Printer, RotateCw } from 'lucide-vue-next';
  import PlanosComponent from './ui/PlanosComponent.vue';
  import SelectComponent from './ui/SelectComponent.vue';

  // necesito una variable de estado que contenga todos los datos del Formulario
  const formData = ref({
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

  const handleDetectPrinter = () => {
    toast.success("Buscando impresoras disponibles...");
    // Aquí iría la lógica de detección de impresora
  };

  const handlePrint = () => {
    window.print();
    toast.success("Enviando a impresión...");
  };

  const handleReload = () => {
    window.location.reload();
  };
</script>

<template>
  <div class="flex gap-1 justify-center">
    <div class="min-h-screen bg-background py-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="bg-card rounded-lg shadow-sm border border-gray-300 p-2 sm:px-8 sm:py-4">
            <div class="mb-2 flex justify-between items-center">
              <h1 class="text-xl font-bold">
                Impresión de Stickers Licencias
              </h1>
              <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20">
                Impresora Disponible
              </span>

            </div>

            <form class="space-y-1">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1">
                  <label htmlFor="numeroRadicacion" class="block text-sm font-medium">
                    Número de Radicación
                  </label>
                  <input 
                    id="numeroRadicacion" 
                    type="text"
                    placeholder="Ej: RAD-2024-001"
                    class="w-full px-3 py-1.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                    v-model="formData.numeroRadicacion"
                  />
                </div>

                <div class="space-y-1">
                  <label htmlFor="fechaRadicacion" class="block text-sm font-medium">
                    Fecha de Radicación
                  </label>
                  <input 
                    id="fechaRadicacion" 
                    type="date"
                    class="w-full px-3 py-1.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                    v-model="formData.fechaRadicacion"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1">
                  <label htmlFor="licencia" class="block text-sm font-medium">
                    Licencia
                  </label>
                  <input 
                    id="licencia" 
                    type="text"
                    placeholder="Número de licencia"
                    class="w-full px-3 py-1.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                    v-model="formData.licencia"
                  />
                </div>

                <div class="space-y-1">
                  <label htmlFor="modalidad" class="block text-sm font-medium">
                    Modalidad
                  </label>
                  <input 
                    id="modalidad" 
                    type="text"
                    placeholder="Modalidad del proyecto"
                    class="w-full px-3 py-1.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                    v-model="formData.modalidad"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label htmlFor="solicitante" class="block text-sm font-medium">
                  Solicitante
                </label>
                <input 
                  id="solicitante" 
                  type="text"
                  placeholder="Nombre completo del solicitante"
                  class="w-full px-3 py-1.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                  v-model="formData.solicitante"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1">
                  <label htmlFor="resolucion" class="block text-sm font-medium">
                    Resolución
                  </label>
                  <input 
                    id="resolucion" 
                    type="text"
                    placeholder="Número de resolución"
                    class="w-full px-3 py-1.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
                    v-model="formData.resolucion"
                  />
                </div>

                <div class="space-y-1">
                  <label htmlFor="fechaResolucion" class="block text-sm font-medium">
                    Fecha de Resolución
                  </label>
                  <input 
                    id="fechaResolucion" 
                    type="date"
                    class="w-full px-3 py-1.5 text-base bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
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
                      className="text-sm font-medium text-foreground cursor-pointer"
                    >
                      Incluir Firma del Ingeniero
                    </label>
                  </div>
                </div>
              </div>
            
              <div class="mt-4 pt-4 border-t border-gray-300 flex flex-wrap gap-6">
                <button 
                  type="button"
                  onClick={handleDetectPrinter}
                  class="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  <Search class="mr-2 h-4 w-4" />
                  Detectar Impresora
                </button>
                <button 
                  type="button"
                  onClick={handlePrint}
                  class="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  <Printer class="mr-2 h-4 w-4" />
                  Imprimir
                </button>
                <button 
                  type="button"
                  onClick={handleReload}
                  class="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  <RotateCw class="mr-2 h-4 w-4" />
                  Recargar
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
    <div class="min-h-screen min-w-1/3 bg-background py-4 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-card rounded-lg shadow-sm border border-gray-300 p-2 sm:px-8 sm:py-4">
          <div class="mb-2">
            <h1 class="text-xl font-bold">
              Vista Previa
            </h1>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>