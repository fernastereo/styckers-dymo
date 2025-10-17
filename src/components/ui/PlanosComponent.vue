<script setup>
  import { ref, watch } from 'vue';
  
  //define titulo como props
  const props = defineProps({
    titulo: {
      type: String,
      required: true
    },
    showDescription: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Object,
      default: () => ({ checked: false, numeroPlanos: 0, descripcion: '' })
    }
  });

  // Define emits
  const emit = defineEmits(['update:modelValue']);

  // Estado local
  const checked = ref(props.modelValue.checked);
  const numeroPlanos = ref(props.modelValue.numeroPlanos);
  const descripcion = ref(props.modelValue.descripcion);
  // Watchers para emitir cambios
  watch(checked, (newValue) => {
    emit('update:modelValue', {
      checked: newValue,
      numeroPlanos: numeroPlanos.value,
      descripcion: descripcion.value
    });
  });

  watch(numeroPlanos, (newValue) => {
    emit('update:modelValue', {
      checked: checked.value,
      numeroPlanos: newValue,
      descripcion: descripcion.value
    });
  });

  watch(descripcion, (newValue) => {
    emit('update:modelValue', {
      checked: checked.value,
      numeroPlanos: numeroPlanos.value,
      descripcion: newValue
    });
  });

  // Watch para cambios externos en modelValue
  watch(() => props.modelValue, (newValue) => {
    if (newValue) {
      checked.value = newValue.checked;
      numeroPlanos.value = newValue.numeroPlanos;
      descripcion.value = newValue.descripcion;
    }
  }, { deep: true });
</script>

<template>
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <input 
        :id="titulo"
        type="checkbox"
        v-model="checked"
        :checked="checked"
        className="w-4 h-4 text-primary bg-background border-gray-300 rounded focus:ring-2 focus:ring-primary cursor-pointer"
      />
      <label 
        :htmlFor="titulo"
        className="text-sm font-medium text-foreground cursor-pointer"
      >
        {{ titulo }}
      </label>

      <div v-if="showDescription" className="ml-6 flex items-center gap-4">
        <label :htmlFor="descripcion" className="block text-sm font-medium text-foreground">
          Descripción
        </label>
        <input 
          id="descripcion"
          type="text"
          placeholder="Descripción del plano"
          className="max-w-md px-3 py-1 bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
          v-model="descripcion"
        />
      </div>
    </div>
    <div className="ml-6 flex items-center gap-4">
        <label :htmlFor="titulo" className="block text-sm font-medium text-foreground">
          Número de Planos
        </label>
        <input 
          id="numPlanos"
          type="number"
          min="0"
          placeholder="0"
          className="max-w-20 px-3 py-1 bg-background border border-gray-300 rounded-md placeholder:text-gray-400  focus-visible:outline-indigo-600 sm:text-sm/6"
          v-model="numeroPlanos"
        />
      </div>
  </div>
</template>

