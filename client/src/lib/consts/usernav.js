import { 
    HiOutlineViewGrid,
    HiDocumentDuplicate,
    HiUsers 
} from "react-icons/hi";

export const USER_NAV_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard/user',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'listroom',
        label: 'Phòng trọ đã đăng',
        path: '/dashboard/user/userroom',
        icon: <HiDocumentDuplicate />
    },
    {
        key: 'newroom',
        label: 'Đăng phòng trọ mới',
        path: '/dashboard/user/newroom',
        icon: <HiDocumentDuplicate />
    },
    {
        key: 'listuser',
        label: 'Thông tin người dùng',
        path: '/dashboard/user/userinfo',
        icon: <HiUsers />
    }
]