import { SVGTypeMapping } from '@svgdotjs/svg.js'
import layoutProps, {
  allFamily,
  randomI1,
  randomI2,
  randomIx,
  randomIy,
} from './constants/random.constant'
import {
  enableDownloadType,
  enableImageDownloadType,
  familyExts,
  logoLayoutPropsType,
} from './defaultProps'
import cheerio from 'cheerio'
import opentype from 'opentype.js'
import { SVG } from '@svgdotjs/svg.js'
import { imgNameArr } from './constants/preview.constant'

export const materialDownLoad = (
  src: string,
  ext: enableDownloadType | enableImageDownloadType
): void => {
  const aLink = document.createElement('a')
  aLink.href = src
  aLink.download = 'test.' + ext
  if (ext === 'svg') {
    aLink.dataset.downloadurl = [
      'image/svg+xml;charset=utf-8',
      aLink.download,
      aLink.href,
    ].join(':')
  }
  aLink.style.display = 'none'
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
  setTimeout(function () {
    URL.revokeObjectURL(aLink.href)
  }, 1500)
}
// svg节点转base64
export const svgToBase64 = (svg: string): string => {
  const div = document.createElement('div')
  div.innerHTML = svg
  const s = new XMLSerializer().serializeToString(
    div.firstElementChild as HTMLElement
  )
  const ImgBase64 = `data:image/svg+xml;base64,${window.btoa(
    unescape(encodeURIComponent(s))
  )}`
  return ImgBase64
}

//这儿使用base64图片也是可以合成的，但用get_file_content返回的svg demo无法合成，使用在线的svg地址也无法合成
/*
export const draw = (
  fn: CallableFunction,
  data: string[],
  props: previewPropsType
): void => {
  const c = document.createElement("canvas"),
    ctx = c.getContext("2d"),
    len = data.length;
  c.width = 340;
  c.height = 224; //除1.5是由于背景图长和宽的比例是1.5
  if (ctx) {
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fff";
    ctx.fill();

    const drawing = (n: number) => {
      if (n < len) {
        const img = new Image();
        img.crossOrigin = "Anonymous"; //解决跨域

        img.src = data[n];
        img.onload = function () {
          if (n == 1) {
            let img_w = 150;
            let img_h = (img.height / img.width) * img_w;
            if (img.height > img.width) {
              img_h = 120;
              img_w = (img.width / img.height) * img_h;
            }
            const { x, y } = props;
            const left = x - img_w / 2;
            const top = y - img_h / 2;
            console.log(
              img.height,
              img.width,
              img_w,
              img_h,
              x,
              y,
              "left：" + left,
              "top:" + top
            );

            ctx.drawImage(img, left, top, img_w, img_h); //参数表示：第一个参数绘制的img图片  第二个参数和第三个参数分别表示绘制的图片距离背景图片左上角的X轴，Y轴，第四个参数和第五个参数表示绘制的图片的大小
          } else {
            ctx.drawImage(img, 0, 0, c.width, c.height);
          }

          drawing(n + 1); //递归
        };
      } else {
        //保存生成作品图片
        c.toDataURL();
        fn(c.toDataURL());
        c.remove();
      }
    };
    drawing(0);
  }
};
*/

export const copyToClipboard = (text: string) => {
  // 创建文本元素，赋值
  const textarea = document.createElement('textarea')
  textarea.value = text
  // 添加样式，隐藏
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '-9999px'
  // 添加到body 选中文本
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy')
  } catch (e) {
    console.warn('copy failed', e)
  } finally {
    document.body.removeChild(textarea)
  }
}

export const findFontExt = (family: string): string => {
  return allFamily[family as keyof familyExts]
}
type SvgType = SVGTypeMapping<SVGSVGElement>
export const addSvgFont = (family: string, draw: SvgType): SvgType => {
  console.log(draw.svg())

  const style = draw.style()
  const ext = findFontExt(family)
  style.font(
    family,
    `url("https://logosvg.oss-cn-chengdu.aliyuncs.com/fonts/${family}${ext}")`
  )
  console.log(draw.svg())
  return draw
}

export const getFontUrl = (family: string): string => {
  const ext = findFontExt(family)
  return `https://logosvg.oss-cn-chengdu.aliyuncs.com/fonts/${family}${ext}`
}

//根据logo名称的长度，获取合理的布局属性
export const getLayoutPropsByNameLength = (
  length: number,
  index: number
): logoLayoutPropsType => {
  const returnProps: logoLayoutPropsType = {
    imageX: randomI1[index],
    imageY: randomI2[index],
    nameDX: randomIx[index],
    nameDY: randomIy[index],
    nameEnDX: randomIx[index],
    nameEnDY: randomIy[index] + 40,
    nameEnFontSize: 25,
    nameFontSize: 75,
  }
  if (length !== 4) {
    if (length > 15) {
      length = 15
    }
    returnProps.imageX = layoutProps[length].randomI1[index]
    returnProps.imageY = layoutProps[length].randomI2[index]
    returnProps.nameDX = layoutProps[length].randomIx[index]
    returnProps.nameDY = layoutProps[length].randomIy[index]
    returnProps.nameEnDX = layoutProps[length].randomIx[index]
    returnProps.nameEnDY = layoutProps[length].randomIy[index] + 40
    returnProps.nameFontSize = layoutProps[length].randomNameFontSize
    returnProps.nameEnFontSize = layoutProps[length].randomNameEnFontSize
  }

  return returnProps
}

const svgCode =
  '<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.5 36.5"><defs><style>.cls-1{fill:#00a63c;}.cls-2{fill:#008134;}</style></defs><title>11-7</title><path class="cls-1" d="M212.39,240.37c10-5.46,6.84-16.49,3.33-17.36a18.72,18.72,0,0,0-2.82-.21,18.14,18.14,0,0,0-8.31,2v7.93h-7.93a18.28,18.28,0,0,0,0,16.63h5.49C203.05,246.83,205.64,244.07,212.39,240.37Z" transform="translate(-194.66 -222.8)"/><path class="cls-2" d="M229.15,232.73H223c-1.48,2.63-4.43,5.69-10.08,8.32-11.65,5.41-5.51,17.36-3.64,17.88a18.39,18.39,0,0,0,12-1.64v-7.93h7.93a18.28,18.28,0,0,0,0-16.63Z" transform="translate(-194.66 -222.8)"/></svg>'
export const parseImageSVG = (): void => {
  const $ = cheerio.load(svgCode)
  const colors: string[] = []
  const styleContent = $('style').html()
  const fillPattern = /#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g
  //const fillPattern2 = /^([.#]?\w+)[^{]+\{[^}]*\}/g;
  console.log(styleContent?.match(fillPattern))
  $('path').each((index, path) => {
    const fill = $(path).attr('fill')
    if (fill) {
      colors.push(fill)
    } else {
      // 看看是否有className
      const className = $(path).attr('class')
      console.log(className)
    }
  })
  console.log($.html())
}

//吸取图标的颜色
export const getColor = (xml: string): string[] => {
  const colorPattern = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g
  const colors: string[] = []
  const colorArr = xml.match(colorPattern) as string[]
  for (const i in colorArr) {
    if (parseInt(i) >= 15) break
    const v = colorArr[i]
    if (colors.indexOf(v) === -1) {
      colors.push(v)
    }
  }
  return colors
}

export const useOpenType = (
  text: string,
  url: string,
  size: number,
  fill: string,
  family: string
): void => {
  opentype.load(url, function (err, fontObj) {
    console.log(err)
    const path = fontObj?.getPath(text, 0, 0, size)
    const pathTag = path?.toSVG(2)
    const gTag = `<g font-size="${size}" dx="245" dy="185" font-family="${family}" x="0" y="0" class="svg-name0" transform="matrix(1,0,0,1,0,185)" fill="${fill}">${pathTag}</g>`
    console.log(gTag)
  })
}

//替换字体元素为代码
export const replaceText = (cls: string, family: string): void => {
  // 替换logo
  const textNode = document.querySelector(cls)
  const textContent = textNode?.outerHTML
  if (textContent) {
    let tmp = textContent.replace(/<text/, '<g')
    tmp = tmp.replace(/\/text>$/, '/g>')
    const $ = cheerio.load(tmp, { xml: true })
    const text = $('g').text()
    const size = $('g').attr('font-size') as string
    const url = getFontUrl(family)
    const dy = $('g').attr('dy')
    $('g').attr('transform', `matrix(1,0,0,1,0,${dy})`)
    $('g').attr('font-family', family)
    opentype.load(url, (err, fontObj) => {
      const path = fontObj?.getPath(text, 0, 0, parseInt(size))
      const pathTag = path?.toSVG(2) as string
      $('g').html(pathTag)
      const div = document.createElement('div')
      div.innerHTML = '<svg><svg>' + $.html() + '</svg></svg>'
      const textParentNode = textNode?.parentNode
      textNode?.remove()
      textParentNode?.appendChild(div.childNodes[0])
    })
  }
}
export const toTop = (): void => {
  let top = document.documentElement.scrollTop || document.body.scrollTop
  // 实现滚动效果
  const timeTop = setInterval(() => {
    document.body.scrollTop = document.documentElement.scrollTop = top -= 50
    if (top <= 0) {
      clearInterval(timeTop)
    }
  }, 40)
}

// 修复svg代码，有时候会和cheerio有冲突
const fixSvgCode = (svgCode: string): string => {
  svgCode = svgCode.replace(/<!--\s*(.*)\s*-->/, '')
  svgCode = svgCode.replace(/<\?xml.*\?>/, '')
  svgCode = svgCode.trim()
  return svgCode
}

export const getSvgHtml = (logoList: any[]): any[] => {
  const htmlArr: any[] =
    logoList.length === 10
      ? [[], [], [], [], [], [], [], [], [], []]
      : [[], [], [], [], [], [], [], []]
  for (let i = 0; i < logoList.length; i++) {
    const svgObj = SVG(`.svg${i}`)
    svgObj.node.removeAttribute('xmlns:svgjs')
    svgObj.node.removeAttribute('svgjs:data')
    const svg1 = svgObj.svg()
    //替换掉svgjs:data，否则图片加载不出
    const p2 = /svgjs:data\s*?=\s*?([‘"])[\s\S]*?\1/g
    const svg = svg1.replace(p2, '')

    //循环imgNamrArr
    imgNameArr.forEach((imgName, imgIndex) => {
      const item = imgName
      const img_w = item.w
      const img_h = item.h
      const $ = cheerio.load(svg, { xml: true })
      $('svg').css('width', img_w.toString())
      $('svg').css('height', img_h.toString())
      $('svg').css('transform', item.r)
      $('svg').css('margin-top', item.mt)
      $('svg').css('margin-right', item.mr)
      if (imgIndex === 7) {
        $('svg').css('filter', 'drop-shadow(rgba(0, 0, 0, 0.2) -10px 10px 0px)')
      }

      const currentSvg = logoList[i].svg
      const colorPattern = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g

      $(`.svg-logo${i} svg`).attr('width', '110')
      $(`.svg-logo${i} svg`).attr('height', '110')

      const parser = new DOMParser()
      const doc = parser.parseFromString($.html(), 'text/xml')
      htmlArr[i][imgIndex] = doc.getElementsByClassName(`svg${i}`)[0]
    })
  }
  return htmlArr
}
