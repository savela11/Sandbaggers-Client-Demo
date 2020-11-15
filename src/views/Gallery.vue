<template>
  <div>
    <h1>Gallery</h1>

    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'Gallery' })
export default class Gallery extends Vue {
  gallery = [
    {
      eventId: 0,
      year: '2020',
      images: [
        {
          createdBy: 'Andy Savela',
          createdOn: '',
          url: '',
          likes: [{ by: 'Test user', createdOn: '' }],
          comments: [{ by: 'Test user', createdOn: '' }],
        },
      ],
    },
  ]
}
</script>

<style scoped lang="scss"></style>
