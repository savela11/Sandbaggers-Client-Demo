<template>
  <div class="gallery">
    <div class="list">
      <div class="event" v-for="event in gallery" :key="event.eventId">
        <div class="container">
          <div class="top">
            <h2>{{ event.name }}</h2>

          </div>
          <div class="bottom">
            <div class="imgContainer">
              <img :src="event.imgUrl" alt="">
            </div>
            <div class="info">
              <button>View Gallery</button>
            </div>

          </div>
        </div>

      </div>
    </div>
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
      name: 'Traverse City',
      imgUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      images: [
        {
          createdBy: 'Andy Savela',
          createdOn: '',
          likes: [{ by: 'Test user', createdOn: '' }],
          comments: [{ by: 'Test user', createdOn: '' }]
        }
      ]
    },
    {
      eventId: 1,
      year: '2021',
      name: 'Test',
      imgUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      images: [
        {
          createdBy: 'Andy Savela',
          createdOn: '',
          likes: [{ by: 'Test user', createdOn: '' }],
          comments: [{ by: 'Test user', createdOn: '' }]
        }
      ]
    }
  ]
}
</script>

<style scoped lang="scss">
.gallery {

  .list {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 2rem 0 0 0;
    scroll-behavior: smooth;
    height: 450px;


    .event {
      display: inline-block;
      height: 100%;
      width: 100%;

      &:not(:last-child) {
        margin-right: 1rem;
      }


      .container {
        display: flex;
        flex-direction: column;
        height: 100%;

        .top {
          flex: 0 0 20%;
          display: flex;
          justify-content: center;

          h2 {
            color: $DarkBlue;
            font-size: 1.4rem;
          }

        }

        .bottom {
          border-radius: 5px;
          flex: 0 0 80%;
          position: relative;
          display: flex;
          flex-direction: column;
          padding: .3rem;

          .imgContainer {
            flex: auto;
            height: 100%;
            width: 100%;
            position: relative;

            &::after {
              content: '';
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              position: absolute;
              background-color: rgba(23, 37, 42, .3);
              border-radius: 5px;
              z-index: 1;

            }

            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
              border-radius: 5px;


            }
          }

          .info {
            flex: 0 0 25%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;

            button {
              border: none;
              border-radius: 50px;
              padding: 1rem 2rem;
              background-color: $DarkBlue;
              color: white;
              font-weight: bold;
              font-size: 1rem;
              width: 100%;

            }

          }

        }
      }


    }
  }
}
</style>
