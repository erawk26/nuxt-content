<template lang="pug">
.form-container.ml-0
  v-form.full-width(ref='form', v-model='valid', lazy-validation='')
    .eo-flex.wrap.contact-info.pb-3
      .cell.eo-flex.a-center.inline.fa.fa-phone.color.blk
        span.screen-reader Phone Number
        img.txt(src='~/assets/img/phone.png', alt='Phone Number')
      .cell.eo-flex.a-center.inline.fa.fa-envelope-o
        span.screen-reader E-Mail Address
        img.txt(src='~/assets/img/email.png', alt='Email')
    v-alert.pa-2.full-width(v-if='status.message', :type='status.type') {{ status.message }}
    v-text-field(
      outlined,
      v-model='visitor.name',
      :rules='nameRules',
      label='Name',
      required
    )
    v-text-field(
      outlined,
      v-model='visitor.email',
      :rules='emailRules',
      label='E-mail',
      required
    )
    v-text-field(
      outlined,
      v-model='visitor.phone',
      :rules='phoneRules',
      label='Phone'
    )
    v-textarea(
      outlined,
      v-model='visitor.message',
      :rules='messageRules',
      label='Message',
      required
    )
    v-btn.mr-4.bold(
      outlined,
      :disabled='!valid',
      color='success',
      @click='submitForm'
    )
      | Send
    v-btn.mr-4.bold(outlined, color='error', @click='reset')
      | Clear
</template>

<script>
/* eslint-disable no-console */
export default {
  transition(to, from) {
    if (!from) return 'slide-up'
    return +to.query.page < +from.query.page ? 'slide-down' : 'slide-up'
  },
  data: () => ({
    visitor: { name: '', email: '', message: '', phone: '' },
    nameRules: [(v) => !!v || 'Name is required'],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    phoneRules: [
      (v) => {
        const re = /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/
        return !v || re.test(v) || 'Phone must be valid'
      },
    ],
    messageRules: [
      (v) => !!v || 'Message is required',
      (v) => (v && v.length >= 10) || 'Message must be more than 10 characters',
    ],
    valid: false,
    status: { message: null, type: null },
    messageTimeout: null,
  }),
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    submitForm(e) {
      e.preventDefault()
      if (this.$refs.form.validate()) {
        const { email, phone, name, message } = this.visitor
        this.sendEmail(email + 'sent you an email from your website!', {
          name,
          email,
          phone,
          message,
        })
        this.setStatus('Form Submitted! Processing...', 'warning')
      }
    },
    setStatus(message, type = 'success', time = 5) {
      clearTimeout(this.messageTimeout)
      this.status = { message, type }
      this.messageTimeout = setTimeout(() => {
        this.status = { message: null, type: null }
      }, time * 1000)
    },
    sendEmail(subject, body) {
      const url =
        process.env.NODE_ENV === 'development'
          ? process.env.NUXT_ENV_DEV_SEND_MAIL
          : process.env.NUXT_ENV_PROD_SEND_MAIL
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((res) => {
          const msg =
            "Thanks for sending me a message! I'll get in touch with you ASAP. :)"
          this.setStatus(msg, 'success')
          this.reset()
        })
        .catch((err) => {
          const msg = `I'm sorry There was an error with sending your message. :(\n${err.message}`
          this.setStatus(msg, 'error', 10)
          console.error({ err })
          this.reset()
        })
    },
    // checkField (e) {
    //   // console.log(_invalid, _val);
    //   // fields.phone && fields.phone.invalid
    //   if (e.type === 'focus') e.target.nextSibling.classList.add('slide-up')
    //   if (e.type === 'blur' && e.target.value === '') { e.target.nextSibling.classList.remove('slide-up') }
    // }
  },
}
</script>

<style lang="scss" scoped>
.contact-info {
  position: relative;
  z-index: 12;
  .cell {
    margin-right: 0.5em;
  }
  img {
    height: 30px;
    width: auto;
  }
}
</style>

<style lang="scss">
.theme--dark img.txt {
  filter: invert(1);
}
.form-container {
}
section.page.component-content.contact--page {
  @include set-max-width(500px);
}
</style>
