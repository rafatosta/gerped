import { CustomFlowbiteTheme } from 'flowbite-react'

export const SidebarTheme: CustomFlowbiteTheme['sidebar'] =
  {
    "root": {
      "base": "h-full",
      "collapsed": {
        "on": "w-16",
        "off": "w-64"
      },
      "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-800 px-3 py-4"
    },
    "collapse": {
      "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-white transition duration-75 hover:bg-gray-700",
      "icon": {
        "base": "h-6 w-6 text-gray-400 transition duration-75 group-hover:text-white",
        "open": {
          "off": "",
          "on": "text-white"
        }
      },
      "label": {
        "base": "ml-3 flex-1 whitespace-nowrap text-left",
        "icon": {
          "base": "h-6 w-6 transition delay-0 ease-in-out",
          "open": {
            "on": "rotate-180",
            "off": ""
          }
        }
      },
      "list": "space-y-2 py-2"
    },
    "cta": {
      "base": "mt-6 rounded-lg bg-gray-700 p-4",
      "color": {
        "blue": "bg-cyan-900",
        "dark": "bg-dark-900",
        "failure": "bg-red-900",
        "gray": "bg-alternative-900",
        "green": "bg-green-900",
        "light": "bg-light-900",
        "red": "bg-red-900",
        "purple": "bg-purple-900",
        "success": "bg-green-900",
        "yellow": "bg-yellow-900",
        "warning": "bg-yellow-900"
      }
    },
    "item": {
      "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-700",
      "active": "bg-gray-700",
      "collapsed": {
        "insideCollapse": "group w-full pl-8 transition duration-75",
        "noIcon": "font-bold"
      },
      "content": {
        "base": "flex-1 whitespace-nowrap px-3"
      },
      "icon": {
        "base": "h-6 w-6 flex-shrink-0 text-gray-400 transition duration-75 group-hover:text-white",
        "active": "text-gray-100"
      },
      "label": "",
      "listItem": ""
    },
    "items": {
      "base": ""
    },
    "itemGroup": {
      "base": "mt-4 space-y-2 border-t border-gray-700 pt-4 first:mt-0 first:border-t-0 first:pt-0"
    },
    "logo": {
      "base": "mb-5 flex items-center pl-2.5",
      "collapsed": {
        "on": "hidden",
        "off": "self-center whitespace-nowrap text-xl font-semibold text-white"
      },
      "img": "mr-3 h-6 sm:h-7"
    }


  };