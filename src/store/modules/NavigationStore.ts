import { IRootState } from '@/store'
import { ActionContext } from 'vuex'
import { NavigationStoreState, UserLink } from '@/types/vuexStore/NavigationStore'

const state: NavigationStoreState = {
    isNavBarShowing: true,
    isNavMenuShowing: false,
    isBackBtnShowing: false,
    isUtilityMenuShowing: false,
    userLinks: [
        {
            name: 'Dashboard',
            link: '/dashboard',
            requiredRole: 'User',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="#17252A"/>\n' +
                '</svg>\n'
        },
        {
            name: 'Events',
            link: '/Events',
            requiredRole: 'User',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M19.5 21C20.3284 21 21 20.3284 21 19.5C21 18.6716 20.3284 18 19.5 18C18.6716 18 18 18.6716 18 19.5C18 20.3284 18.6716 21 19.5 21Z" fill="#17252A"/>\n' +
                '<path d="M17 5.92L9 2V20H7V18.27C5.21 18.62 4 19.26 4 20C4 21.1 6.69 22 10 22C13.31 22 16 21.1 16 20C16 19.01 13.84 18.19 11 18.03V8.98L17 5.92Z" fill="#17252A"/>\n' +
                '</svg>\n'
        },
        {
            name: 'Bets',
            link: '/bets',
            requiredRole: 'User',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11.41 16.09V18H8.74V16.07C7.03 15.71 5.58 14.61 5.47 12.67H7.43C7.53 13.72 8.25 14.54 10.08 14.54C12.04 14.54 12.48 13.56 12.48 12.95C12.48 12.12 12.04 11.34 9.81 10.81C7.33 10.21 5.63 9.19 5.63 7.14C5.63 5.42 7.02 4.3 8.74 3.93V2H11.41V3.95C13.27 4.4 14.2 5.81 14.26 7.34H12.3C12.25 6.23 11.66 5.47 10.08 5.47C8.58 5.47 7.68 6.15 7.68 7.11C7.68 7.95 8.33 8.5 10.35 9.02C12.37 9.54 14.53 10.41 14.53 12.93C14.52 14.76 13.15 15.76 11.41 16.09Z" fill="#17252A"/>\n' +
                '</svg>\n'
        },
        {
            name: 'Ideas',
            link: '/ideas',
            requiredRole: 'User',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M3.55 5.46L4.96 4.05L6.75 5.85L5.34 7.26L3.55 5.46ZM11 1.55H13V4.5H11V1.55ZM4 13.5H1V11.5H4V13.5ZM15 17.69V22.5H9V17.69C7.21 16.65 6 14.72 6 12.5C6 9.19 8.69 6.5 12 6.5C15.31 6.5 18 9.19 18 12.5C18 14.72 16.79 16.65 15 17.69ZM20 13.5V11.5H23V13.5H20ZM17.24 5.84L19.03 4.04L20.44 5.45L18.64 7.24L17.24 5.84Z" fill="#17252A"/>\n' +
                '</svg>\n'
        },
        {
            name: 'PowerRankings',
            link: '/powerRankings',
            requiredRole: 'User',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M25 7.8125C25 9.22852 24.6501 10.5387 23.9502 11.7432C23.2503 12.9476 22.3022 13.8957 21.106 14.5874C19.9097 15.2791 18.6035 15.625 17.1875 15.625H16.4062C14.8438 16.3249 14.0625 17.3665 14.0625 18.75C14.0625 20.4102 14.7135 21.5413 16.0156 22.1436C16.862 22.29 17.5293 22.4772 18.0176 22.7051C18.5059 22.9329 18.75 23.1771 18.75 23.4375C18.75 23.877 18.1396 24.2472 16.9189 24.5483C15.6982 24.8494 14.2253 25 12.5 25C10.7747 25 9.30176 24.8494 8.08105 24.5483C6.86035 24.2472 6.25 23.877 6.25 23.4375C6.25 23.1771 6.49414 22.9329 6.98242 22.7051C7.4707 22.4772 8.13802 22.29 8.98438 22.1436C10.2865 21.5413 10.9375 20.4102 10.9375 18.75C10.9375 17.3665 10.1562 16.3249 8.59375 15.625H7.8125C6.39648 15.625 5.09033 15.2791 3.89404 14.5874C2.69775 13.8957 1.74967 12.9476 1.0498 11.7432C0.349935 10.5387 0 9.22852 0 7.8125C0 6.25 0.427246 4.89909 1.28174 3.75977C2.13623 2.62044 3.27962 1.80664 4.71191 1.31836C4.69564 0.813802 4.6875 0.374349 4.6875 0H20.3125C20.3125 0.390625 20.3044 0.830078 20.2881 1.31836C21.7204 1.80664 22.8638 2.62044 23.7183 3.75977C24.5728 4.89909 25 6.25 25 7.8125ZM5.00488 4.58984C3.75163 5.28971 3.125 6.36393 3.125 7.8125C3.125 9.06576 3.56038 10.144 4.43115 11.0474C5.30192 11.9507 6.35579 12.4268 7.59277 12.4756C6.32324 10.5062 5.46061 7.8776 5.00488 4.58984ZM13.916 4.71191L12.5 1.5625L11.084 4.71191L7.8125 5.15137L10.2295 7.51953L9.59473 10.9375L12.5 9.27734L15.4053 10.9375L14.7705 7.51953L17.1875 5.15137L13.916 4.71191ZM19.9951 4.58984C19.5394 7.8776 18.6768 10.5062 17.4072 12.4756C18.6442 12.4268 19.6981 11.9507 20.5688 11.0474C21.4396 10.144 21.875 9.06576 21.875 7.8125C21.875 6.36393 21.2484 5.28971 19.9951 4.58984Z" fill="#17252A"/>\n' +
                '</svg>\n'
        },
        {
            name: 'Mock Drafts',
            link: '/mockDrafts',
            requiredRole: 'User',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M19 5V19H5V5H19ZM20.1 3H3.9C3.4 3 3 3.4 3 3.9V20.1C3 20.5 3.4 21 3.9 21H20.1C20.5 21 21 20.5 21 20.1V3.9C21 3.4 20.5 3 20.1 3V3ZM11 7H17V9H11V7ZM11 11H17V13H11V11ZM11 15H17V17H11V15ZM7 7H9V9H7V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15Z" fill="#17252A"/>\n</svg>'
        },
        {
            name: 'Gallery',
            link: '/gallery',
            requiredRole: 'User',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0)">\n<path d="M21.1073 5.25H6.65625C5.0625 5.25 3.75 6.53953 3.75 8.12484V19.6252C3.75 21.2105 5.0625 22.5 6.65625 22.5H21.0938C22.6875 22.5 24 21.2728 24 19.6875V8.12484C24 6.53953 22.7025 5.25 21.1073 5.25V5.25ZM17.4909 8.12531C17.9168 8.1279 18.3324 8.25657 18.6853 8.49507C19.0382 8.73357 19.3125 9.07123 19.4737 9.46546C19.6349 9.85968 19.6757 10.2928 19.591 10.7102C19.5063 11.1276 19.3 11.5106 18.9979 11.8108C18.6958 12.1111 18.3116 12.3151 17.8937 12.3973C17.4758 12.4794 17.0429 12.436 16.6496 12.2724C16.2564 12.1088 15.9204 11.8324 15.6841 11.4781C15.4477 11.1238 15.3216 10.7075 15.3216 10.2816C15.3238 9.70806 15.5535 9.15887 15.9602 8.75453C16.3669 8.35018 16.9174 8.12372 17.4909 8.12484V8.12531ZM6.63703 21.0628C5.84016 21.0628 5.23734 20.4183 5.23734 19.6256V16.5867L9.47766 12.7997C9.89219 12.435 10.4296 12.2411 10.9814 12.2571C11.5333 12.273 12.0586 12.4975 12.4514 12.8855L15.3877 15.7969L10.0908 21.0623L6.63703 21.0628ZM22.5 19.6252C22.4999 19.8141 22.4626 20.0011 22.3903 20.1756C22.3179 20.3501 22.2118 20.5086 22.0781 20.6421C21.9444 20.7756 21.7857 20.8814 21.6111 20.9535C21.4365 21.0256 21.2494 21.0626 21.0605 21.0623H12.1406L17.6287 15.6094C18.0182 15.2808 18.511 15.1 19.0205 15.0986C19.53 15.0973 20.0238 15.2754 20.415 15.6019L22.5 17.3714V19.6252Z" fill="#17252A"/>\n<path d="M18 1.5H3C2.20435 1.5 1.44129 1.81607 0.87868 2.37868C0.316071 2.94129 0 3.70435 0 4.5L0 16.5C0.00054868 17.1651 0.221737 17.8113 0.628907 18.3372C1.03608 18.8631 1.60622 19.2391 2.25 19.4062V7.125C2.25 6.22989 2.60558 5.37145 3.23851 4.73851C3.87145 4.10558 4.72989 3.75 5.625 3.75H20.9062C20.7391 3.10622 20.3631 2.53608 19.8372 2.12891C19.3113 1.72174 18.6651 1.50055 18 1.5Z" fill="#17252A"/>\n</g>\n<defs>\n<clipPath id="clip0">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>\n</svg>'
        },
        {
            name: 'Contacts',
            link: '/contacts',
            requiredRole: 'User',
            icon: `<svg width='100%' height='100%' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M19 0H4C3.46957 0 2.96086 0.210714 2.58579 0.585786C2.21071 0.960859 2 1.46957 2 2V5H0V7H2V9H0V11H2V13H0V15H2V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM11 2.999C12.648 2.999 14 4.35 14 5.999C13.9971 6.79385 13.6801 7.55533 13.1182 8.11747C12.5562 8.67962 11.7948 8.99684 11 9C9.353 9 8 7.647 8 5.999C8 4.35 9.353 2.999 11 2.999ZM17 16H5V15.25C5 13.031 7.705 10.75 11 10.75C14.295 10.75 17 13.031 17 15.25V16Z' fill='#17252A'/>
      </svg>`
        }
    ],
    adminLinks: [
        {
            name: 'Roles',
            link: '/admin/roles',
            requiredRole: 'Admin',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M19.5 21C20.3284 21 21 20.3284 21 19.5C21 18.6716 20.3284 18 19.5 18C18.6716 18 18 18.6716 18 19.5C18 20.3284 18.6716 21 19.5 21Z" fill="#17252A"/>\n' +
                '<path d="M17 5.92L9 2V20H7V18.27C5.21 18.62 4 19.26 4 20C4 21.1 6.69 22 10 22C13.31 22 16 21.1 16 20C16 19.01 13.84 18.19 11 18.03V8.98L17 5.92Z" fill="#17252A"/>\n' +
                '</svg>\n'
        },
        {
            name: 'Events',
            link: '/admin/eventManager',
            requiredRole: 'Admin',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M19.5 21C20.3284 21 21 20.3284 21 19.5C21 18.6716 20.3284 18 19.5 18C18.6716 18 18 18.6716 18 19.5C18 20.3284 18.6716 21 19.5 21Z" fill="#17252A"/>\n' +
                '<path d="M17 5.92L9 2V20H7V18.27C5.21 18.62 4 19.26 4 20C4 21.1 6.69 22 10 22C13.31 22 16 21.1 16 20C16 19.01 13.84 18.19 11 18.03V8.98L17 5.92Z" fill="#17252A"/>\n' +
                '</svg>\n'
        },

        {
            name: 'Draft',
            link: '/admin/DraftManager',
            requiredRole: 'Admin',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M19.5 21C20.3284 21 21 20.3284 21 19.5C21 18.6716 20.3284 18 19.5 18C18.6716 18 18 18.6716 18 19.5C18 20.3284 18.6716 21 19.5 21Z" fill="#17252A"/>\n' +
                '<path d="M17 5.92L9 2V20H7V18.27C5.21 18.62 4 19.26 4 20C4 21.1 6.69 22 10 22C13.31 22 16 21.1 16 20C16 19.01 13.84 18.19 11 18.03V8.98L17 5.92Z" fill="#17252A"/>\n' +
                '</svg>\n'
        }
    ],
    additionalLinks: [
        {
            name: 'PowerRankings',
            link: '/additional/PowerRankings',
            requiredRole: 'MillerTime',
            icon:
                '<svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M25 7.8125C25 9.22852 24.6501 10.5387 23.9502 11.7432C23.2503 12.9476 22.3022 13.8957 21.106 14.5874C19.9097 15.2791 18.6035 15.625 17.1875 15.625H16.4062C14.8438 16.3249 14.0625 17.3665 14.0625 18.75C14.0625 20.4102 14.7135 21.5413 16.0156 22.1436C16.862 22.29 17.5293 22.4772 18.0176 22.7051C18.5059 22.9329 18.75 23.1771 18.75 23.4375C18.75 23.877 18.1396 24.2472 16.9189 24.5483C15.6982 24.8494 14.2253 25 12.5 25C10.7747 25 9.30176 24.8494 8.08105 24.5483C6.86035 24.2472 6.25 23.877 6.25 23.4375C6.25 23.1771 6.49414 22.9329 6.98242 22.7051C7.4707 22.4772 8.13802 22.29 8.98438 22.1436C10.2865 21.5413 10.9375 20.4102 10.9375 18.75C10.9375 17.3665 10.1562 16.3249 8.59375 15.625H7.8125C6.39648 15.625 5.09033 15.2791 3.89404 14.5874C2.69775 13.8957 1.74967 12.9476 1.0498 11.7432C0.349935 10.5387 0 9.22852 0 7.8125C0 6.25 0.427246 4.89909 1.28174 3.75977C2.13623 2.62044 3.27962 1.80664 4.71191 1.31836C4.69564 0.813802 4.6875 0.374349 4.6875 0H20.3125C20.3125 0.390625 20.3044 0.830078 20.2881 1.31836C21.7204 1.80664 22.8638 2.62044 23.7183 3.75977C24.5728 4.89909 25 6.25 25 7.8125ZM5.00488 4.58984C3.75163 5.28971 3.125 6.36393 3.125 7.8125C3.125 9.06576 3.56038 10.144 4.43115 11.0474C5.30192 11.9507 6.35579 12.4268 7.59277 12.4756C6.32324 10.5062 5.46061 7.8776 5.00488 4.58984ZM13.916 4.71191L12.5 1.5625L11.084 4.71191L7.8125 5.15137L10.2295 7.51953L9.59473 10.9375L12.5 9.27734L15.4053 10.9375L14.7705 7.51953L17.1875 5.15137L13.916 4.71191ZM19.9951 4.58984C19.5394 7.8776 18.6768 10.5062 17.4072 12.4756C18.6442 12.4268 19.6981 11.9507 20.5688 11.0474C21.4396 10.144 21.875 9.06576 21.875 7.8125C21.875 6.36393 21.2484 5.28971 19.9951 4.58984Z" fill="#17252A"/>\n' +
                '</svg>\n'

        },


    ]
}

const getters = {
    IsNavBarShowing: (state: NavigationStoreState): boolean => state.isNavBarShowing,
    IsNavMenuShowing: (state: NavigationStoreState): boolean => state.isNavMenuShowing,
    IsBackBtnShowing: (state: NavigationStoreState): boolean => state.isBackBtnShowing,
    IsUtilityBarShowing: (state: NavigationStoreState): boolean => state.isUtilityMenuShowing,
    UserLinks: (state: NavigationStoreState): Array<UserLink> => state.userLinks,
    AdminLinks: (state: NavigationStoreState): Array<UserLink> => state.adminLinks,
    AdditionalLinks: (state: NavigationStoreState): Array<UserLink> => state.additionalLinks
}

const mutations = {
    SetNavBarShowingStatus(state: NavigationStoreState, showingStatus: boolean): void {
        state.isNavBarShowing = showingStatus
    },

    SetNavMenuShowingStatus(state: NavigationStoreState, showingStatus: boolean): void {
        state.isNavMenuShowing = showingStatus
    },
    SetBackBtnShowingStatus(state: NavigationStoreState, showingStatus: boolean): void {
        state.isBackBtnShowing = showingStatus
    },

    SetUtilityMenuShowingStatus(state: NavigationStoreState, showingStatus: boolean): void {
        state.isUtilityMenuShowing = showingStatus
    }
}

const actions = {
    _setNavBarShowingStatus(context: ActionContext<NavigationStoreState, IRootState>, showingStatus: boolean): void {
        context.commit('SetNavBarShowingStatus', showingStatus)
    },

    _setNavMenuShowingStatus(context: ActionContext<NavigationStoreState, IRootState>, showingStatus: boolean): void {
        context.commit('SetNavMenuShowingStatus', showingStatus)
    },
    _setBackBtnShowingStatus(context: ActionContext<NavigationStoreState, IRootState>, showingStatus: boolean): void {
        context.commit('SetBackBtnShowingStatus', showingStatus)
    },

    _setUtilityMenuShowingStatus(context: ActionContext<NavigationStoreState, IRootState>, showingStatus: boolean): void {
        context.commit('SetUtilityMenuShowingStatus', showingStatus)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
