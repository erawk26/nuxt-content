/* eslint-disable no-console */
import Vue from 'vue'
import gsap from 'gsap'
import ScrollT from 'gsap/ScrollTrigger'
if (process.client) {
  gsap.registerPlugin(ScrollT)
}
Vue.directive('hover', {
  bind(el, binding, vNode) {
    // Provided expression must evaluate to an object.
    const compName = vNode.context.name
    if (typeof binding.value !== 'object') {
      let warn = `[v-hover]: provided expression '${binding.expression}' is not an object, but it needs to be.`
      if (compName) {
        warn += `\nFound in component '${compName}'`
      }
      console.warn(warn)
    }
    if (!binding.value.over && !binding.value.leave) {
      let warn = `[v-hover]: object provided does not have 'over' or 'leave' properties. Needs at least one to be of use`
      if (compName) {
        warn += `\nFound in component '${compName}'`
      }
      console.warn(warn)
    }
    el.__vHoverOver__ = binding.value.over || (() => {})
    el.__vHoverLeave__ = binding.value.leave || (() => {})

    // Add Event Listeners
    el.addEventListener('mouseover', el.__vHoverOver__)
    el.addEventListener('mouseleave', el.__vHoverLeave__)
  },
  unbind(el, binding) {
    // Remove Event Listeners
    el.removeEventListener('mouseover', el.__vHoverOver__)
    el.removeEventListener('mouseleave', el.__vHoverLeave__)
    delete el.__vHoverOver__
    delete el.__vHoverLeave__
  },
})
Vue.directive('flip', {
  bind(el, binding, vNode) {
    const front = el.querySelector('[data-front]')
    const back = el.querySelector('[data-back]')
    if (front && back) {
      gsap.set(front, { rotationY: 0 })
      gsap.set(back, { rotationY: -180 })
      el.__vflipOver__ = () => flipCard(el, 1)
      el.__vflipBack__ = () => flipCard(el, -1)

      // Add Event Listeners
      el.addEventListener('mouseover', el.__vflipOver__)
      el.addEventListener('mouseleave', el.__vflipBack__)
    }
  },
  unbind(el, binding) {
    // Remove Event Listeners
    el.removeEventListener('mouseover', el.__vflipOver__)
    el.removeEventListener('mouseleave', el.__vflipBack__)
    delete el.__vflipOver__
    delete el.__vflipBack__
  },
})
function flipCard(e, dir) {
  const frontRotation = dir > 0 ? 180 : 0
  const backRotation = dir > 0 ? 0 : -180
  gsap.to(e.querySelector('[data-front]'), {
    rotationY: frontRotation,
    duration: 1,
  })
  gsap.to(e.querySelector('[data-back]'), {
    rotationY: backRotation,
    duration: 1,
  })
}
Vue.directive('scrolltrigger', {
  bind(el, binding, vNode) {
    // Provided expression must evaluate to an object.
    const compName = vNode.context.name
    if (typeof binding.value !== 'object') {
      let warn = `[v-scrolltrigger]: provided expression '${binding.expression}' is not an object, but it needs to be.`
      if (compName) {
        warn += `\nFound in component '${compName}'`
      }
      console.warn(warn)
    }
    if (!binding.value.tween) {
      let warn = `[v-scrolltrigger]: object provided does not have 'tween' property. Needs tween() to be of use`
      if (compName) {
        warn += `\nFound in component '${compName}'`
      }
      console.warn(warn)
    }
    const tween = binding.value.tween
    el.__vTimeline__ = tween(gsap, {
      trigger: el,
      start: 'top 80%',
      end: 'top 80%',
      // scrub: true,
      toggleActions: 'play none reverse none',
      markers: false,
    })
  },
  unbind(el, binding) {
    // Remove Event Listeners
    if (el.__vTimeline__) {
      el.__vTimeline__.clear()
    }
    delete el.__vTimeline__
  },
})
