import { 
    HiOutlineViewGrid,
    HiDocumentDuplicate,
    HiUsers 
} from "react-icons/hi";

export const ADMIN_NAV_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard/admin',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'listroom',
        label: 'Danh sách phòng trọ',
        path: '/dashboard/admin/rooms',
        icon: <HiDocumentDuplicate />
    },
    {
        key: 'listuser',
        label: 'Danh sách người dùng',
        path: '/dashboard/admin/users',
        icon: <HiUsers />
    }
]