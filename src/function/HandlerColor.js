const handleColorChange = (setColor, setColorState, setLabelColor) => (event) => {
    const color = event.target.value
    setColor(color)
    setColorState(color)
  
    const isLightColor = isLight(color)
    setLabelColor(isLightColor ? '#fff' : '#000')
  }
  
  const isLight = (color) => {
    const rgb = parseInt(color.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
  
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
    return brightness > 128
  }  