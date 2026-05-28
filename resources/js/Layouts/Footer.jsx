import { Typography } from "@material-tailwind/react";
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import {
  FaInstagram,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp
} from "react-icons/fa";
import {
  ShieldCheckIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#0E1C2D] lg:block hidden">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/">
              <ApplicationLogo className="h-20 w-20 fill-current text-[#D9B36A]" />
            </Link>

            <Typography className="mt-4 max-w-xs text-[#D9B36A] text-sm leading-relaxed">
              Whistleblow adalah sebuah ruang kreatif berbasis budaya yang
              hadir setiap hari Ahad pagi di Desa Gunungsari, Madiun. Dikelola oleh
              komunitas lokal dan mendukung UMKM dan produk kreatif seperti <span className="font-semibold">@lontar.craft</span>.
            </Typography>

            <ul className="mt-8 flex gap-6">
              <li>
                <Link
                  href="https://www.instagram.com/pasarpundensari/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-[#D9B36A] hover:text-white transition"
                >
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="w-6 h-6" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            <div>
              <p className="font-medium text-[#D9B36A] flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#C69C6D]" />
                Informasi
              </p>
              <ul className="mt-6 space-y-4 text-sm text-white">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1 text-[#C69C6D]" />
                  <span>Desa Gunungsari, Kec./Kab. Madiun</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaClock className="mt-1 text-[#C69C6D]" />
                  <span>Buka: Ahad, 06.00 - 11.00 WIB</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaWhatsapp className="mt-1 text-[#C69C6D]" />
                  <span>
                    Admin: 0895-0215-5868 / 0878-3633-4432
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1 text-[#C69C6D]" />
                  <a
                    href="https://maps.app.goo.gl/Fa5Mr5EhnqL5sSvx9"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#D9B36A] transition"
                  >
                    Google Maps Lokasi
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.9814886915083!2d111.54180629999999!3d-7.5769933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79bfb3db8c096b%3A0x3282e46b8c88693e!2sPasar%20Pundensari!5e0!3m2!1sid!2sid!4v1750051852648!5m2!1sid!2sid"
                width="400"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <Typography className="text-xs text-[#C69C6D] mt-10">
          &copy; {currentYear}. Whistleblow. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
}
