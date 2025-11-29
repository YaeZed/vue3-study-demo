import type { Directive } from 'vue';


export const vLazy: Directive<HTMLImageElement, string> = async (el, binding) => {

    let url = await import('./vue.svg')
    el.src = url.default

    const observer = new IntersectionObserver((entries) => {
        console.log(entries);

        const entry = entries[0]

        if (entry.isIntersecting && entry.intersectionRatio > 0) {
            setTimeout(() => {
                el.src = binding.value
                observer.unobserve(el)
            }, 1000)
        }
    })

    observer.observe(el)

}