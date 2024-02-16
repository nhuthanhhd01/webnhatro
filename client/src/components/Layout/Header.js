import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth, auth } from '../../context/auth'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/");
  }

  return (
    <header className="bg-blue-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-5 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/#" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </Link>
          <Link to="/" className="text-white text-xl pt-1 pl-3">
               PhongTroHN
          </Link>
        </div>

        <ul className="flex pt-1">
          <li className="nav-item">
            <NavLink to="/" className="text-base px-3 font-semibold leading-6 text-white hover:text-red-500">
              Trang chủ
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/" className="text-base px-3 font-semibold leading-6 text-white hover:text-red-500">
              Tìm người ở ghép (Coming soon)
            </NavLink>
          </li>
        </ul>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!auth?.user ? (
            <>
              <div className="nav-item">
                <NavLink to="/register" className="text-base px-3 font-semibold leading-6 text-white">
                  Đăng ký
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink to="/login" className="text-base px-3 font-semibold leading-6 text-white">
                  Đăng nhập
                </NavLink>
              </div>
            </>
            ) : (
              <>
                <div className="flex relative">
                  <NavLink
                    className="text-base px-3 font-semibold leading-6 text-white"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ border: "none" }}
                    onClick={() => setOpen(!open)}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  {
                    open &&
                    <div className='bg-white p-4 w-48 shadow-lg absolute -left-8 top-8'>
                      <ul>
                        <li 
                          className='p-1 text-base cursor-pointer rounded hover:bg-blue-100'
                        >
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          >
                            Quản lý tài khoản
                          </NavLink>
                        </li>
                        <li className='p-1 text-base cursor-pointer rounded hover:bg-blue-100' onClick={handleLogout}>Đăng xuất</li>
                      </ul>
                    </div>
                  }
                  {/* <ul className="dropdown-menu flex">
                    <li>
                      <NavLink
                        to="/#"
                          className="text-base px-3 font-semibold leading-6 text-white"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        className="text-base px-3 font-semibold leading-6 text-white"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul> */}
                </div>
              </>
                )}
        </div>
      </nav>
  </header>
  )
}

export default Header
