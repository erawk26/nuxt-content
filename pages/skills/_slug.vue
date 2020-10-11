<template lang="pug">
section.page
  h1 {{ skills[slug]||'Skills' }}
  //- nuxt-content(:document='page')
</template>

<script>
export default {
  async asyncData({ $content, error, params }) {
    const slug = params.slug || 'index'
    const reportErr = (err) => {
      console.log(err)
      error({ statusCode: 404, message: 'Page not found', res: err })
    }
    const projects = await $content('projects')
      .where({ slug: { $ne: 'index' } })
      .sortBy('title')
      .fetch()
      .catch(reportErr)
    const kebab = (val) =>
      val
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
    const skills = projects.reduce((skillsObj, currentProject) => {
      currentProject.skills.forEach((skill) => {
        if (!(kebab(skill) in skillsObj)) {
          skillsObj[kebab(skill)] = skill
        }
      })
      return skillsObj
    }, {})
    // const meta = {
    //   title: page.title,
    //   desc: page.description,
    // }
    return {
      slug,
      projects,
      skills,
      // meta,
    }
  },
}
</script>
