import { temp } from '@/core/temp'
import type { Temp } from '@/core/temp'
import { onUnmounted, shallowRef } from 'vue'

export const useTempData = <T>(selector: (temp: Temp) => T) => {
    const value = shallowRef(selector(temp))

    const updateRefValue = () => {
        value.value = selector(temp)
        animationFrameRequest = requestAnimationFrame(updateRefValue)
    }

    let animationFrameRequest = requestAnimationFrame(updateRefValue)

    onUnmounted(() => {
        cancelAnimationFrame(animationFrameRequest)
    })

    return value
}
