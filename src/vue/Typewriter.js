import { defineComponent, h, onMounted, onUnmounted } from 'vue-demi'
import TypewriterCore from './../core';

export default defineComponent({
  props: {
    component: {
      type: String,
      default: 'div'
    },
    onInit: {
      type: Function,
      default: null
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },

  setup(props) {
    const instance = ref(null)
    const typewriter = ref(null)

    onMounted(() => {
      instance.value = new TypewriterCore(typewriter.value, props.options)
      if (props.onInit) {
        props.onInit(instance.value)
      }
    })

    onUnmounted(() => {
      if (instance.value) {
        instance.value.stop()
      }
    })

    return () => h(
      props.component,
      { ref: 'typewriter', 'data-testid': 'typewriter-wrapper' }
    )
  }
})
