<script setup>
  import { ref, watch } from 'vue';
  import { ChevronDown } from 'lucide-vue-next';

  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    }
  });

  // Define emits
  const emit = defineEmits(['update:modelValue']);

  // Estado local
  const selectedValue = ref(props.modelValue);

  // Watch para emitir cambios
  watch(selectedValue, (newValue) => {
    emit('update:modelValue', newValue);
  });

  // Watch para cambios externos en modelValue
  watch(() => props.modelValue, (newValue) => {
    selectedValue.value = newValue;
  });
</script>

<template>
  <div class="space-y-1">
    <label :htmlFor="label" class="block text-sm/6 font-medium text-gray-900">{{ label }}</label>
    <div class="grid grid-cols-1">
      <select 
        :id="label" 
        :name="label" 
        v-model="selectedValue"
        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 "
      >
        <option value="" disabled>Seleccione una opción</option>
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
      <ChevronDown class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400" aria-hidden="true" />
    </div>
  </div>
</template>