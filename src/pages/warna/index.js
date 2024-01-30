import React, { useState, useRef } from 'react'
import chroma from 'chroma-js'
import Head from 'next/head'
import Layout from '@/components/Layout'

const Warna = () => {
  const [color1, setColor1] = useState('#bbbbbb')
  const [color2, setColor2] = useState('#cccccc')
  const [color3, setColor3] = useState('#dddddd')
  const [color4, setColor4] = useState('#eeeeee')

  const determineLabelColor = (backgroundColor) => {
    const contrastColor =
      chroma.contrast(backgroundColor, 'black') > chroma.contrast(backgroundColor, 'white')
        ? 'black'
        : 'white'
    return contrastColor
  }

  const [labelColor1, setLabelColor1] = useState(determineLabelColor(color1))
  const [labelColor2, setLabelColor2] = useState(determineLabelColor(color2))
  const [labelColor3, setLabelColor3] = useState(determineLabelColor(color3))
  const [labelColor4, setLabelColor4] = useState(determineLabelColor(color4))

  const inputColorRef1 = useRef(null)
  const inputColorRef2 = useRef(null)
  const inputColorRef3 = useRef(null)
  const inputColorRef4 = useRef(null)

  const handleColorChange = (setColor, setColorState, setLabelColor) => (event) => {
    const color = event.target.value
    setColor(color)
    setColorState(color)
    setLabelColor(determineLabelColor(color))
  }

  const createHandleDivClick = (inputColorRef, setColor, setLabelColor, currentColor) => () => {
    inputColorRef.current.click()
    setColor(currentColor)
    setLabelColor(determineLabelColor(currentColor))
  }

  return (
    <Layout>
      <Head>
        <title>Pengaturan Warna</title>
      </Head>
      <div className='max-w-screen-lg w-screen h-full flex justify-center items-center flex-col'>
        <h1 className='text-2xl font-bold text-center text-black mb-20'>PENGATURAN WARNA</h1>
        <form className='max-w-2xl w-full'>
          <div
            className="w-[60%] ml-[121px] rounded-tl-xl rounded-tr-xl  overflow-hidden py-10 relative"
            style={{ background: color1, color: labelColor1 }}
            onClick={createHandleDivClick(inputColorRef1, setColor1, setLabelColor1, color1)}
          >
            <p className="text-center font-bold">Warna Latar 1</p>
            <input
              ref={inputColorRef1}
              type="color"
              value={color1}
              name='bg_1'
              id='bg_1'
              onChange={handleColorChange(setColor1, setColor1, setLabelColor1)}
              className='ml-8 bg-none cursor-pointer absolute w-full h-full opacity-0'
            />
            <div
              style={{ background: color1, position: 'absolute', top: 0, right: 0, bottom: 0, width: '20px' }}
            />
          </div>
          <div
            className="w-[60%] ml-[121px] block overflow-hidden py-10 relative"
            style={{ background: color2, color: labelColor2 }}
            onClick={createHandleDivClick(inputColorRef2, setColor2, setLabelColor2, color2)}
          >
            <p className="text-center font-bold">Warna Latar 2</p>
            <input
              ref={inputColorRef2}
              type="color"
              value={color2}
              name='bg_2'
              id='bg_2'
              onChange={handleColorChange(setColor2, setColor2, setLabelColor2)}
              className='ml-8 bg-none cursor-pointer absolute w-full h-full opacity-0'
            />
            <div
              style={{ background: color2, position: 'absolute', top: 0, right: 0, bottom: 0, width: '20px' }}
            />
          </div>
          <div
            className="w-[60%] ml-[121px] block overflow-hidden py-10 relative"
            style={{ background: color3, color: labelColor3 }}
            onClick={createHandleDivClick(inputColorRef3, setColor3, setLabelColor3, color3)}
          >
            <p className="text-center font-bold">Warna Teks 1</p>
            <input
              ref={inputColorRef3}
              type="color"
              value={color3}
              name='txt_1'
              id='txt_1'
              onChange={handleColorChange(setColor3, setColor3, setLabelColor3)}
              className='ml-8 bg-none cursor-pointer absolute w-full h-full opacity-0'
            />
            <div
              style={{ background: color3, position: 'absolute', top: 0, right: 0, bottom: 0, width: '20px' }}
            />
          </div>
          <div
            className="w-[60%] ml-[121px] rounded-bl-xl rounded-br-xl block overflow-hidden py-10 relative"
            style={{ background: color4, color: labelColor4 }}
            onClick={createHandleDivClick(inputColorRef4, setColor4, setLabelColor4, color4)}
          >
            <p className="text-center font-bold">Warna Teks 2</p>
            <input
              ref={inputColorRef4}
              type="color"
              value={color4}
              name='txt_2'
              id='txt_2'
              onChange={handleColorChange(setColor4, setColor4, setLabelColor4)}
              className='ml-8 bg-none cursor-pointer absolute w-full h-full opacity-0'
            />
            <div
              style={{ background: color4, position: 'absolute', top: 0, right: 0, bottom: 0, width: '20px' }}
            />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Warna