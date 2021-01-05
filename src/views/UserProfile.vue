<template>
  <div class='userProfile'>
    <PopUp class='popUp' v-if='isPopUpShowing' :showPopUp='showPopUp' @click.prevent.stop='togglePopUp(false)'>
      <template v-slot:title>
        <h4 class='text my-1 my-md-2 text--bold text--md text--center color--primary text-vpLG--lg'>Upload Profile Image</h4>
      </template>
      <template v-slot:content>
        <div class='popUpView'>
          <div v-if='!popUpLoading' class='view'>
            <input type='file' class='text text--sm' @change.prevent='uploadImage($event.target.files)' id='fileInput' />
          </div>
          <Loading v-else></Loading>
        </div>
      </template>
    </PopUp>
    <div v-if='currentUser && currentUser.profile'>
      <div class='backBtn'>
        <button class='btn btn--border-darkGreen btn--xs btn--borderBottom' @click.prevent.stop='$router.go(-1)'>Back</button>
      </div>
      <section class='section section__top'>
        <IconBtn class='uploadBtn' btn-text='Profile Image' @click.prevent.stop='togglePopUp(true)'>
          <template v-slot:svg>
            <!--          ADD SVG-->
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g clip-path='url(#clip0)'>
                <path
                    d='M21.1073 5.25H6.65625C5.0625 5.25 3.75 6.53953 3.75 8.12484V19.6252C3.75 21.2105 5.0625 22.5 6.65625 22.5H21.0938C22.6875 22.5 24 21.2728 24 19.6875V8.12484C24 6.53953 22.7025 5.25 21.1073 5.25ZM17.4909 8.12531C17.9168 8.1279 18.3324 8.25657 18.6853 8.49507C19.0382 8.73357 19.3125 9.07123 19.4737 9.46546C19.6349 9.85968 19.6757 10.2928 19.591 10.7102C19.5063 11.1276 19.3 11.5106 18.9979 11.8108C18.6958 12.1111 18.3116 12.3151 17.8937 12.3973C17.4758 12.4794 17.0429 12.436 16.6496 12.2724C16.2564 12.1088 15.9204 11.8324 15.6841 11.4781C15.4477 11.1238 15.3216 10.7075 15.3216 10.2816C15.3238 9.70806 15.5535 9.15887 15.9602 8.75453C16.3669 8.35018 16.9174 8.12372 17.4909 8.12484V8.12531ZM6.63703 21.0628C5.84016 21.0628 5.23734 20.4183 5.23734 19.6256V16.5867L9.47766 12.7997C9.89219 12.435 10.4296 12.2411 10.9814 12.2571C11.5333 12.273 12.0586 12.4975 12.4514 12.8855L15.3877 15.7969L10.0908 21.0623L6.63703 21.0628ZM22.5 19.6252C22.4999 19.8141 22.4626 20.0011 22.3903 20.1756C22.3179 20.3501 22.2118 20.5086 22.0781 20.6421C21.9444 20.7756 21.7857 20.8814 21.6111 20.9535C21.4365 21.0256 21.2494 21.0626 21.0605 21.0623H12.1406L17.6287 15.6094C18.0182 15.2808 18.511 15.1 19.0205 15.0986C19.53 15.0973 20.0238 15.2754 20.415 15.6019L22.5 17.3714V19.6252Z'
                    fill='#17252A'
                />
                <path
                    d='M18 1.5H3C2.20435 1.5 1.44129 1.81607 0.87868 2.37868C0.316071 2.94129 0 3.70435 0 4.5L0 16.5C0.00054868 17.1651 0.221737 17.8113 0.628907 18.3372C1.03608 18.8631 1.60622 19.2391 2.25 19.4062V7.125C2.25 6.22989 2.60558 5.37145 3.23851 4.73851C3.87145 4.10558 4.72989 3.75 5.625 3.75H20.9062C20.7391 3.10622 20.3631 2.53608 19.8372 2.12891C19.3113 1.72174 18.6651 1.50055 18 1.5Z'
                    fill='#17252A'
                />
              </g>
              <defs>
                <clipPath id='clip0'>
                  <rect width='24' height='24' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </template>
        </IconBtn>
        <div class='imageContainer'>
          <img alt='User profile image' v-bind:src='userProfileImage' />
        </div>
        <div class='userInfo'>
          <h1 class='text text--xl text--bold text--ls-0 color--primary'>{{ currentUser.fullName }}</h1>
          <div class='handicapContainer'>
            <div class='flexHandicap'>
              <p class='text text--sm color--secondary text--center text--fw-500'>Handicap:</p>
              <label class='hideLabel' for='userHandicap'></label>
              <input id='userHandicap' v-model.lazy.number.trim='currentUser.profile.handicap' class='input' type='text' />
            </div>
          </div>
        </div>
      </section>

      <section class='section section__middle'></section>

      <section v-if='!loading' class='section section__bottom'>
        <div class='view profile' v-if="currentView.title === 'Profile'">
          <form class='form'>
            <InputField :isActive="currentUser.profile.firstName !== ''" className='secondary'>
              <template v-slot:field>
                <label for='firstName'>First Name</label>
                <input type='text' id='firstName' v-model.trim='currentUser.profile.firstName' />
              </template>
            </InputField>
            <InputField :isActive="currentUser.profile.lastName !== ''" className='secondary'>
              <template v-slot:field>
                <label for='lastName'>Last Name</label>
                <input type='text' id='lastName' v-model.trim='currentUser.profile.lastName' />
              </template>
            </InputField>
            <InputField :isActive="currentUser.email !== ''" className='secondary'>
              <template v-slot:field>
                <label for='email'>Email</label>
                <input type='email' id='email' v-model.trim='currentUser.email' />
              </template>
            </InputField>
            <InputField :isActive="currentUser.phoneNumber !== ''" className='secondary'>
              <template v-slot:field>
                <label for='phoneNumber'>Phone Number</label>
                <input type='tel' id='phoneNumber' v-model.trim='currentUser.phoneNumber' @input='formatPhone' />
              </template>
            </InputField>
          </form>
        </div>

        <!--      Settings -->
        <div v-if="currentView.title === 'Settings'" class='view settings'>
          <div class='favorites'>
            <h2>Favorite Links</h2>
            <div class='favoriteLink'>
              <p>One</p>
              <SelectBox class='selectComponent' @click='toggleOptions(0)' :showOptions='selectedOption === 0'>
                <template v-slot:selected>
                  <span v-if='currentUser.settings.favoriteLinks[0]'>{{ currentUser.settings.favoriteLinks[0].name }}</span>
                </template>
                <template v-slot:options>
                  <span class='option' v-for='link in filterFavoriteLinks(selectableFavoriteLinks)' :key='link.name' @click='selectFavoriteLink(link, 0)'>{{ link.name }}</span>
                </template>
              </SelectBox>
            </div>
            <div class='favoriteLink'>
              <p>Two</p>
              <SelectBox class='selectComponent' @click='toggleOptions(1)' :showOptions='selectedOption === 1'>
                <template v-slot:selected>
                  <span v-if='currentUser.settings.favoriteLinks[1]'>{{ currentUser.settings.favoriteLinks[1].name }}</span>
                </template>
                <template v-slot:options>
                  <span class='option' v-for='link in filterFavoriteLinks(selectableFavoriteLinks)' :key='link.name' @click='selectFavoriteLink(link, 1)'>{{ link.name }}</span>
                </template>
              </SelectBox>
            </div>
            <div class='favoriteLink'>
              <p>Three</p>
              <SelectBox class='selectComponent' @click='toggleOptions(2)' :showOptions='selectedOption === 2'>
                <template v-slot:selected>
                  <span v-if='currentUser.settings.favoriteLinks[2]'>{{ currentUser.settings.favoriteLinks[2].name }}</span>
                </template>
                <template v-slot:options>
                  <span class='option' v-for='link in filterFavoriteLinks(selectableFavoriteLinks)' :key='link.name' @click='selectFavoriteLink(link, 2)'>{{ link.name }}</span>
                </template>
              </SelectBox>
            </div>
          </div>

          <div class='contacts'>
            <h2>Contact Page</h2>
            <div class='contacts__flex'>
              <p>Show Number:</p>
              <div class='contacts__btns'>
                <button :class='{ active: currentUser.settings.isContactNumberShowing === true }' @click.prevent.stop='currentUser.settings.isContactNumberShowing = true'>
                  Yes
                </button>
                <button :class='{ active: currentUser.settings.isContactNumberShowing === false }' @click.prevent.stop='currentUser.settings.isContactNumberShowing = false'>
                  No
                </button>
              </div>
            </div>
            <div class='contacts__flex'>
              <p>Show Email:</p>
              <div class='contacts__btns'>
                <button :class='{ active: currentUser.settings.isContactEmailShowing === true }' @click.prevent.stop='currentUser.settings.isContactEmailShowing = true'>
                  Yes
                </button>
                <button :class='{ active: currentUser.settings.isContactEmailShowing === false }' @click.prevent.stop='currentUser.settings.isContactEmailShowing = false'>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--Bets-->
        <ProfileBets v-if="currentView.title === 'Bets'" class='view bets' :bets='currentUserBets' @update-bet='updateBet' @delete-bet='deleteBet' />

        <!--      Update Button-->
        <div class='updateBtnContainer' v-show="currentView.title !== 'Bets'">
          <button v-show='currentView.title' class='btn btn--xs btn--border-darkGreen' @click.stop.prevent='updateCurrentUser'>Update</button>
        </div>
      </section>

      <div class='menuContainer'>
        <button class='toggleMenuBtn' @click='toggleOptionMenu(!isOptionMenuShowing)'>
          <svg fill='none' viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 7.5H7.13213V0.514709H0V7.5ZM8.93393 7.5H16.0661V0.514709H8.93393V7.5ZM17.8303 7.5H25V0.514709H17.8303V7.5ZM0 16.25H7.13213V9.26471H0V16.25ZM8.93393 16.25H16.0661V9.26471H8.93393V16.25ZM17.8303 16.25H25V9.26471H17.8303V16.25ZM0 25H7.13213V17.9779H0V25ZM8.93393 25H16.0661V17.9779H8.93393V25ZM17.8303 25H25V17.9779H17.8303V25Z'
                fill='#17252A'
            />
          </svg>
        </button>
        <div v-show='isOptionMenuShowing' class='optionMenu'>
          <h2>Edit</h2>
          <div class='optionMenu__grid'>
            <button v-for='option in optionViews' :key='option.title' @click='toggleEditView(option)'>
              <span class='imageSpan' v-html='option.image'></span>
              <span>{{ option.title }}</span>
            </button>
          </div>
        </div>
      </div>

      <Loading v-if='loading' />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
import UIHelper from '@/utility/UIHelper'
import Helper from '@/utility/Helper'
import { FavoriteLinkVm, UserVm } from '@/types/ViewModels/UserVm'
import ProfileService from '@/services/ProfileService'
import { BetVm } from '@/types/ViewModels/BetVm'


interface IOptionView {
  title: string
  image: string
}

@Component({
  name: 'UserProfile',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    SelectBox: (): Promise<typeof import('*.vue')> => import('@/components/ui/SelectBox.vue'),
    ProfileBets: (): Promise<typeof import('*.vue')> => import('@/views/userProfile/profileBets.vue'),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/Forms/InputField.vue'),
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue'),
    PopUp: (): Promise<typeof import('*.vue')> => import('@/components/ui/PopUp.vue')
  }
})
export default class UserProfile extends Vue {
  loading = true
  loadingBets = true
  optionViews: Array<IOptionView> = [
    {
      title: 'Profile',
      image:
          '<svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M13.5 0H1.5C0.675 0 0 0.675 0 1.5V14.5C0 15.325 0.675 16 1.5 16H13.5C14.325 16 15 15.325 15 14.5V1.5C15 0.675 14.325 0 13.5 0ZM13 14H2V2H13V14ZM4 9H11V10H4V9ZM4 11H11V12H4V11ZM5 4.5C5.00007 4.30295 5.03894 4.10785 5.11441 3.92582C5.18988 3.7438 5.30046 3.57842 5.43984 3.43913C5.57922 3.29984 5.74467 3.18937 5.92675 3.11403C6.10882 3.03868 6.30395 2.99993 6.501 3C6.69805 3.00007 6.89315 3.03894 7.07518 3.11441C7.2572 3.18988 7.42258 3.30046 7.56187 3.43984C7.70116 3.57922 7.81163 3.74467 7.88697 3.92675C7.96232 4.10882 8.00107 4.30395 8.001 4.501C8.00087 4.89896 7.84265 5.28056 7.56116 5.56187C7.27967 5.84317 6.89796 6.00113 6.5 6.001C6.10204 6.00087 5.72044 5.84265 5.43913 5.56116C5.15783 5.27967 4.99987 4.89796 5 4.5ZM7.5 6H5.5C4.675 6 4 6.45 4 7V8H9V7C9 6.45 8.325 6 7.5 6Z" fill="#17252A"/>' +
          '</svg>'
    },
    {
      title: 'Settings',
      image:
          '<svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
          '<path d="M7.70833 12.5C7.70833 15.2083 9.86111 17.3611 12.5694 17.3611C15.2778 17.3611 17.4306 15.2083 17.4306 12.5C17.4306 9.79166 15.2778 7.63889 12.5694 7.63889C9.86111 7.63889 7.70833 9.79166 7.70833 12.5V12.5ZM16.0417 12.5C16.0417 14.4444 14.5139 15.9722 12.5694 15.9722C10.625 15.9722 9.09722 14.4444 9.09722 12.5C9.09722 10.5556 10.625 9.02777 12.5694 9.02777C14.5139 9.02777 16.0417 10.5556 16.0417 12.5Z" fill="#17252A"/>\n' +
          '<path d="M22.7778 10.2083L20.8333 9.58333L20.7639 9.375C20.2083 9.375 19.6528 9.23611 19.0972 9.09722C19.3056 9.51389 19.5139 10 19.6528 10.4167L19.7222 10.7639L22.2222 11.5278V13.4722L19.7222 14.2361L19.6528 14.5833L19.0278 16.0417L18.8194 16.3889L20.0694 18.6806L18.6806 20.0694L16.3889 18.8194L16.0417 19.0278C15.5556 19.3056 15.0694 19.5139 14.5833 19.6528L14.2361 19.7222L13.4722 22.2222H11.5278L10.7639 19.7222L10.4167 19.6528L8.95833 19.0278L8.61111 18.8194L6.31944 20.0694L4.93056 18.6806L6.18056 16.3889L5.97222 16.0417C5.69444 15.5556 5.48611 15.0694 5.34722 14.5833L5.27778 14.2361L2.77778 13.4722V11.5278L5.13889 10.8333L5.27778 10.4861C5.41667 9.93055 5.625 9.44444 5.90278 8.95833L6.11111 8.61111L4.93056 6.31944L6.31944 4.93055L8.54167 6.18055L8.88889 5.97222C9.375 5.69444 9.86111 5.48611 10.4167 5.34722L10.7639 5.20833L11.5278 2.77777H13.4722L14.2361 5.20833L14.5833 5.34722C15.0694 5.48611 15.4861 5.69444 15.9028 5.90277C15.6944 5.34722 15.625 4.79166 15.625 4.16666L15.3472 4.02777L14.7222 2.08333C14.5833 1.73611 14.1667 1.38889 13.6806 1.38889H11.3194C10.8333 1.38889 10.4167 1.73611 10.3472 2.22222L9.72222 4.16666C9.30556 4.23611 8.95833 4.375 8.61111 4.58333L6.80556 3.61111C6.38889 3.40277 5.83333 3.47222 5.48611 3.81944L3.81944 5.48611C3.47222 5.83333 3.40278 6.38889 3.61111 6.80555L4.51389 8.54166C4.375 8.88889 4.23611 9.30555 4.09722 9.65277L2.15278 10.2778C1.73611 10.4167 1.38889 10.8333 1.38889 11.3194V13.6806C1.38889 14.1667 1.73611 14.5833 2.22222 14.7222L4.16667 15.3472L4.58333 16.3889L3.61111 18.1944C3.40278 18.6111 3.47222 19.1667 3.81944 19.5139L5.48611 21.1806C5.83333 21.5278 6.38889 21.5972 6.80556 21.3889L8.61111 20.4167L9.65278 20.8333L10.2778 22.8472C10.4167 23.2639 10.8333 23.6111 11.3194 23.6111H13.6806C14.1667 23.6111 14.5833 23.2639 14.7222 22.8472L15.3472 20.8333L16.3889 20.4167L18.1944 21.3889C18.6111 21.5972 19.1667 21.5278 19.5139 21.1806L21.1806 19.5139C21.5278 19.1667 21.5972 18.6111 21.3889 18.1944L20.4167 16.3889L20.8333 15.3472L22.8472 14.7222C23.2639 14.5833 23.6111 14.1667 23.6111 13.6806V11.3194C23.6111 10.8333 23.2639 10.3472 22.7778 10.2083V10.2083Z" fill="#17252A"/>\n' +
          '<path d="M20.8333 7.6389C22.751 7.6389 24.3056 6.08434 24.3056 4.16668C24.3056 2.24902 22.751 0.694458 20.8333 0.694458C18.9157 0.694458 17.3611 2.24902 17.3611 4.16668C17.3611 6.08434 18.9157 7.6389 20.8333 7.6389Z" fill="#17252A"/>\n' +
          '</svg>\n'
    },
    {
      title: 'Bets',
      image:
          '<svg width="100%" height="100%" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M18 14H2V2H18V14ZM18 0H2C0.89 0 0 0.89 0 2V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H18C18.5304 16 19.0391 15.7893 19.4142 15.4142C19.7893 15.0391 20 14.5304 20 14V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0V0ZM9 13H11V12H12C12.2652 12 12.5196 11.8946 12.7071 11.7071C12.8946 11.5196 13 11.2652 13 11V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7H9V6H13V4H11V3H9V4H8C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V8C7 8.26522 7.10536 8.51957 7.29289 8.70711C7.48043 8.89464 7.73478 9 8 9H11V10H7V12H9V13Z" fill="#17252A"/>' +
          '</svg>'
    },
    {
      title: 'History',
      image:
          '<svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
          '<path d="M7.70833 12.5C7.70833 15.2083 9.86111 17.3611 12.5694 17.3611C15.2778 17.3611 17.4306 15.2083 17.4306 12.5C17.4306 9.79166 15.2778 7.63889 12.5694 7.63889C9.86111 7.63889 7.70833 9.79166 7.70833 12.5V12.5ZM16.0417 12.5C16.0417 14.4444 14.5139 15.9722 12.5694 15.9722C10.625 15.9722 9.09722 14.4444 9.09722 12.5C9.09722 10.5556 10.625 9.02777 12.5694 9.02777C14.5139 9.02777 16.0417 10.5556 16.0417 12.5Z" fill="#17252A"/>\n' +
          '<path d="M22.7778 10.2083L20.8333 9.58333L20.7639 9.375C20.2083 9.375 19.6528 9.23611 19.0972 9.09722C19.3056 9.51389 19.5139 10 19.6528 10.4167L19.7222 10.7639L22.2222 11.5278V13.4722L19.7222 14.2361L19.6528 14.5833L19.0278 16.0417L18.8194 16.3889L20.0694 18.6806L18.6806 20.0694L16.3889 18.8194L16.0417 19.0278C15.5556 19.3056 15.0694 19.5139 14.5833 19.6528L14.2361 19.7222L13.4722 22.2222H11.5278L10.7639 19.7222L10.4167 19.6528L8.95833 19.0278L8.61111 18.8194L6.31944 20.0694L4.93056 18.6806L6.18056 16.3889L5.97222 16.0417C5.69444 15.5556 5.48611 15.0694 5.34722 14.5833L5.27778 14.2361L2.77778 13.4722V11.5278L5.13889 10.8333L5.27778 10.4861C5.41667 9.93055 5.625 9.44444 5.90278 8.95833L6.11111 8.61111L4.93056 6.31944L6.31944 4.93055L8.54167 6.18055L8.88889 5.97222C9.375 5.69444 9.86111 5.48611 10.4167 5.34722L10.7639 5.20833L11.5278 2.77777H13.4722L14.2361 5.20833L14.5833 5.34722C15.0694 5.48611 15.4861 5.69444 15.9028 5.90277C15.6944 5.34722 15.625 4.79166 15.625 4.16666L15.3472 4.02777L14.7222 2.08333C14.5833 1.73611 14.1667 1.38889 13.6806 1.38889H11.3194C10.8333 1.38889 10.4167 1.73611 10.3472 2.22222L9.72222 4.16666C9.30556 4.23611 8.95833 4.375 8.61111 4.58333L6.80556 3.61111C6.38889 3.40277 5.83333 3.47222 5.48611 3.81944L3.81944 5.48611C3.47222 5.83333 3.40278 6.38889 3.61111 6.80555L4.51389 8.54166C4.375 8.88889 4.23611 9.30555 4.09722 9.65277L2.15278 10.2778C1.73611 10.4167 1.38889 10.8333 1.38889 11.3194V13.6806C1.38889 14.1667 1.73611 14.5833 2.22222 14.7222L4.16667 15.3472L4.58333 16.3889L3.61111 18.1944C3.40278 18.6111 3.47222 19.1667 3.81944 19.5139L5.48611 21.1806C5.83333 21.5278 6.38889 21.5972 6.80556 21.3889L8.61111 20.4167L9.65278 20.8333L10.2778 22.8472C10.4167 23.2639 10.8333 23.6111 11.3194 23.6111H13.6806C14.1667 23.6111 14.5833 23.2639 14.7222 22.8472L15.3472 20.8333L16.3889 20.4167L18.1944 21.3889C18.6111 21.5972 19.1667 21.5278 19.5139 21.1806L21.1806 19.5139C21.5278 19.1667 21.5972 18.6111 21.3889 18.1944L20.4167 16.3889L20.8333 15.3472L22.8472 14.7222C23.2639 14.5833 23.6111 14.1667 23.6111 13.6806V11.3194C23.6111 10.8333 23.2639 10.3472 22.7778 10.2083V10.2083Z" fill="#17252A"/>\n' +
          '<path d="M20.8333 7.6389C22.751 7.6389 24.3056 6.08434 24.3056 4.16668C24.3056 2.24902 22.751 0.694458 20.8333 0.694458C18.9157 0.694458 17.3611 2.24902 17.3611 4.16668C17.3611 6.08434 18.9157 7.6389 20.8333 7.6389Z" fill="#17252A"/>\n' +
          '</svg>\n'
    }
  ]
  currentUser = {} as UserVm
  currentUserBets: Array<BetVm> = []
  isOptionMenuShowing = false
  currentView = {} as IOptionView
  selectableFavoriteLinks: FavoriteLinkVm[] = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Sandbaggers', link: '/sandbaggerEvents' },
    { name: 'Bets', link: '/bets' },
    { name: 'Ideas', link: '/ideas' },
    { name: 'PowerRankings', link: '/powerRankings' },
    { name: 'Mock Drafts', link: '/mockDrafts' },
    { name: 'Gallery', link: '/gallery' },
    { name: 'Contacts', link: '/contacts' }
  ]
  selectedOption: null | number = null
  isPopUpShowing = false
  showPopUp = false
  popUpLoading = false

  // Return only favorite links that are not currently selected as a favorite
  filterFavoriteLinks(selectableLinks: FavoriteLinkVm[]): FavoriteLinkVm[] {
    return selectableLinks.filter((v) => {
      const foundIndex = this.currentUser.settings.favoriteLinks.findIndex((fl) => {
        return fl.name === v.name
      })
      if (foundIndex === -1) {
        return v
      } else {
        return
      }
    })
  }

  get userProfileImage(): string {
    if (this.currentUser.profile && this.currentUser.profile.image) {
      return this.currentUser.profile.image
    } else {
      return require('@/assets/SBLogo.png')
    }
  }

  mounted(): void {
    this.currentView = this.optionViews[0]

    this.getUserProfile()
  }

  @Watch('currentUser.profile.handicap', { immediate: true }) onHandicapChange(newVal: number, oldVal: number): void {
    if (oldVal != undefined) {
      const debounce = Helper.debounce(this.updateUserHandicap, 3000)
      debounce(newVal, oldVal)
    }
  }

  async updateUserHandicap(val: number, oldVal: number): Promise<void> {
    if (val !== oldVal) {
      this.loading = true
      try {
        const res = await ProfileService.UpdateUser(this.currentUser)
        if (res.status === 200) {
          this.currentUser = res.data
          await UIHelper.SnackBar({
            isSnackBarShowing: true,
            title: 'Handicap Updated',
            message: `Your handicap has been updated from ${oldVal} to ${val}`,
            classInfo: 'primary'
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 3000)
      }
    }
  }

  async updateBet(bet: BetVm): Promise<void> {
    this.loading = true
    try {
      const res = await ProfileService.UpdateBet(bet)
      if (res.status === 200) {
        const betIndex = this.currentUserBets.findIndex((b) => b.betId === res.data.betId)
        this.currentUserBets[betIndex] = res.data
        setTimeout(() => {
          this.loading = false
          UIHelper.SnackBar({
            title: 'Success',
            message: 'Bet has been updated',
            classInfo: 'primary',
            isSnackBarShowing: true
          })
        }, 3000)
      }
    } catch (e) {
      UIHelper.SnackBar({
        title: 'Error Updating Bet',
        message: '',
        classInfo: 'error',
        isSnackBarShowing: true
      })
      console.log(e)
    }
  }

  async deleteBet(bet: BetVm): Promise<void> {
    this.loading = true
    if (bet.createdBy.id === this.currentUser.id) {
      try {
        const res = await ProfileService.DeleteBet(bet)
        console.log(res)
        if (res.status === 200) {
          const betIndex = this.currentUserBets.findIndex((b) => b.betId === bet.betId)
          this.currentUserBets.splice(betIndex)
          setTimeout(() => {
            this.loading = false
            UIHelper.SnackBar({
              title: 'Success',
              message: 'Bet has been deleted',
              classInfo: 'primary',
              isSnackBarShowing: true
            })
          }, 3000)
        }
      } catch (e) {
        UIHelper.SnackBar({
          title: 'Error Deleting Bet',
          message: '',
          classInfo: 'error',
          isSnackBarShowing: true
        })
        console.log(e)
      }
    } else {
      await this.$store.dispatch('authStore/Logout')
    }
  }

  async updateCurrentUser(): Promise<void> {
    this.loading = true
    const isUserVerified = this.verifyUserInfo()
    if (isUserVerified) {
      try {
        const res = await ProfileService.UpdateUser(this.currentUser)
        if (res.status === 200) {
          setTimeout(() => {
            this.currentUser = res.data
            this.$store.dispatch('authStore/UpdateUserSettings', res.data.settings)
            UIHelper.SnackBar({
              isSnackBarShowing: true,
              title: 'Updated',
              message: 'Your settings have been updated',
              classInfo: 'primary'
            })
          }, Math.floor(Math.random() * 3000))
        }
      } catch (e) {
        console.log(e)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 3000)
      }
    } else {
      this.loading = false
    }
  }

  async getUserProfile(): Promise<void> {
    UIHelper.Header({ title: 'profile', isShowing: false })
    const userId: string = this.$store.state.authStore.currentUser.id
    try {
      const res = await ProfileService.UserProfile(userId)
      if (res.status === 200) {
        this.currentUser = res.data.userVm
        this.currentUserBets = res.data.bets
      }
    } catch (e) {
      console.log(e)
      await this.$store.dispatch('authStore/Logout')
    } finally {
      setTimeout(() => {
        this.loading = false
      }, Math.floor(Math.random() * 3000))
    }
  }

  verifyUserInfo(): boolean {
    let isValid = true
    let errors: Array<string> = []
    if (this.currentUser.email == null || this.currentUser.email === '') {
      isValid = false
      errors.push('Must provide a valid email')
    }
    if (
        this.currentUser.profile.firstName == null ||
        this.currentUser.profile.firstName === '' ||
        this.currentUser.profile.lastName == null ||
        this.currentUser.profile.lastName === ''
    ) {
      isValid = false
      errors.push('First name and Last name are required')
    }
    if (!isValid) {
      UIHelper.SnackBar({
        title: 'Errors',
        message: 'Unable to update user profile',
        isSnackBarShowing: true,
        classInfo: 'error',
        errors: errors
      })
    }

    return isValid
  }

  toggleOptions(option: number): void {
    if (this.selectedOption === option) {
      this.selectedOption = null
      return
    }
    this.selectedOption = option
  }

  selectFavoriteLink(favLink: FavoriteLinkVm, currentLinkIndex: number): void {
    this.currentUser.settings.favoriteLinks[currentLinkIndex] = favLink
    this.selectedOption = currentLinkIndex
  }

  toggleOptionMenu(status: boolean): void {
    this.isOptionMenuShowing = status
  }

  toggleEditView(opt: IOptionView): void {
    this.currentView = opt
    this.toggleOptionMenu(false)
  }

  togglePopUp(status: boolean): void {
    if (status) {
      this.isPopUpShowing = true
      document.body.style.position = 'fixed'
    } else {
      document.body.style.position = 'static'

      setTimeout(() => {
        this.isPopUpShowing = false
      }, 1000)
    }

    this.$nextTick(() => {
      this.showPopUp = status
    })
  }

  async uploadImage(files: FileList): Promise<void> {
    this.popUpLoading = true
    try {
      const image = files[0]
      const formData = new FormData()

      formData.append('profileimg', image, image.name)
      formData.append('userId', this.currentUser.id)
      const res = await ProfileService.UploadProfileImage(formData)
      if (res.status === 200) {
        await this.$store.dispatch('authStore/UpdateUserProfileImage', res.data)
        setTimeout(() => {
          this.popUpLoading = false
        }, Math.floor(Math.random() * 3000))
      }
    } catch (e) {
      console.log(e)
      this.popUpLoading = false
    }
  }

  formatPhone(): void {
    this.currentUser.phoneNumber = Helper.formatPhone(this.currentUser.phoneNumber)
  }
}
</script>

<style lang='scss' scoped>
$--optionBtnFS: (
    null: 0.8rem,
    $mobile: 0.9rem,
);
$--editTitleFS: (
    null: 1.2rem,
    $mobile: rem,
);
$--bottomTitleFS: (
    null: 1rem,
    $mobile: rem,
);

$--settingsTitleFS: (
    null: 1rem,
    $mobile: 1.1rem,
);
$--settingsParaFS: (
    null: 0.8rem,
    $mobile: 0.9rem,
);
$--settingsContactBtnFS: (
    null: 0.8rem,
    $mobile: 0.9rem,
);

$--selectBoxOptionFS: (
    null: 0.8rem,
    $mobile: 0.9rem,
);

.userProfile {
  padding: 0 0 2rem 0;
}

.section {
  &__top {
    align-items: center;
    background-color: white;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    position: relative;
    z-index: 2;
  }

  &__middle {
    align-items: flex-end;
    background-color: $DarkBlue;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    display: flex;
    flex-wrap: nowrap;
    height: 25px;
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 1rem 2rem;
    position: relative;
    transform: translateY(-20px);
    z-index: 1;
  }

  &__bottom {
    padding: 0 1rem;

    h2 {
      @include font-size($--bottomTitleFS);
    }
  }
}

.uploadBtn {
  position: absolute;
  top: 0;
  right: 1rem;
}

.imageContainer {
  background-color: white;
  border-radius: 10px;
  height: 150px;
  padding: 0.5rem;
  width: 150px;

  @include mobile {
    height: 200px;
    width: 200px;
  }

  img {
    border-radius: 10px;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    width: 100%;
  }
}

.userInfo {
  align-items: center;
  display: flex;
  flex-direction: column;

  .handicapContainer {
    .flexHandicap {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    input {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid $SecondaryFS;
      flex: 0 0 25%;
      line-height: 1;
      margin-left: 0.3rem;
    }
  }
}

.menuContainer {
  align-items: center;

  bottom: 0.5rem;
  display: flex;
  justify-content: center;
  position: fixed;
  right: 0.3rem;
  height: 50px;
  width: 50px;
  z-index: 2;

  .toggleMenuBtn {
    background-color: white;
    border: none;
    border-radius: 0;
    width: 35px;
    height: 35px;
    padding: 0.2rem;

    svg {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  .optionMenu {
    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 10px;
    bottom: 0;
    box-shadow: 0 5px 5px rgba(128, 128, 128, 0.6);
    padding: 0.8rem;
    position: absolute;
    right: 0;
    transform: translate(-20px, -60px);
    z-index: 5;

    h2 {
      margin: 0.5rem;
      @include font-size($--editTitleFS);
    }

    &__grid {
      display: grid;
      gap: 0.4rem;
      grid-auto-rows: 60px;
      grid-template-columns: repeat(3, 75px);
      padding: 0.8rem 0;
      @include mobile {
        grid-auto-rows: 80px;
        grid-template-columns: repeat(3, 90px);
      }

      button {
        align-items: center;
        border: none;
        box-shadow: 0 3px 3px grey;
        @include font-size($--optionBtnFS);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0.2rem;
      }
    }

    .imageSpan {
      height: 25px;
      margin-bottom: 0.1rem;
      width: 25px;

      @include mobile {
        height: 30px;
        margin-bottom: 0.2rem;
        width: 30px;
      }
    }
  }
}

.view {
  label {
    margin-left: 0.5rem;
  }
}

.settings {
  h2 {
    @include font-size($--settingsTitleFS);
  }

  p {
    @include font-size($--settingsParaFS);
  }

  select {
  }

  .custom-select-wrapper {
    position: relative;
    user-select: none;
    width: 100%;
    max-width: 125px;

    .custom-select {
      position: relative;
      display: flex;
      flex-direction: column;
      border-width: 0 2px 0 2px;
      border-style: solid;
      border-color: #394a6d;
      border-radius: 3px;

      &__trigger {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem 0.5rem;
        @include font-size($--selectBoxOptionFS);
        font-weight: 300;
        color: #3b3b3b;
        background: #ffffff;
        cursor: pointer;
        border-width: 2px 0 2px 0;
        border-style: solid;
        border-color: #394a6d;
        border-radius: 3px;
      }

      .arrow {
        position: relative;
        height: 10px;
        width: 10px;

        &::before,
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          width: 0.15rem;
          height: 100%;
          transition: all 0.5s;
        }

        &::before {
          left: 0;
          transform: rotate(45deg);
          background-color: #394a6d;
        }

        &::after {
          left: 6px;
          transform: rotate(-45deg);
          background-color: #394a6d;
        }
      }
    }

    .custom-options {
      position: absolute;
      display: block;
      top: 100%;
      left: 0;
      right: 0;
      border: 1px solid #394a6d;
      border-top: none;
      background: #fff;
      transition: all 0.5s;
      pointer-events: none;
      z-index: 2;

      .custom-option {
        position: relative;
        display: block;
        padding: 0.5rem;
        @include font-size($--selectBoxOptionFS);
        font-weight: 300;
        color: #3b3b3b;
        cursor: pointer;
        transition: all 0.5s;
      }

      .custom-option:hover {
        cursor: pointer;
        background-color: #b2b2b2;
      }

      .custom-option.selected {
        color: #ffffff;
        background-color: #305c91;
      }
    }
  }

  .open .arrow::before {
    left: -5px;
    transform: rotate(-45deg);
  }

  .open .arrow::after {
    left: 5px;
    transform: rotate(45deg);
  }

  .custom-select.open .custom-options {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }

  .favorites {
  }

  .favoriteLink {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.8rem;

    .selectComponent {
      flex: 0 0 60%;
    }
  }

  .contacts {
    &__flex {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
    }

    &__btns {
      align-items: center;
      display: flex;
      margin-left: 1rem;

      button {
        @include font-size($--settingsContactBtnFS);
        background-color: white;
        border: 1px solid $DarkBlue;
        color: $DarkBlue;
        margin-right: 0.5rem;
        padding: 0.3rem 1.2rem;

        &:last-of-type {
          margin: 0;
        }

        &.active {
          color: white;
          background-color: $DarkBlue;
        }
      }
    }
  }
}

.updateBtnContainer {
  padding: 2rem 1rem;
  @include mobile {
    padding: 2rem;
  }

  button {
    color: $DarkGreen;
    font-weight: bold;
  }
}

.popUpView {
  .view {
    display: flex;
    flex-direction: column;
  }

  input {
    max-width: 80%;
    margin: 0 auto;
  }


}
</style>
