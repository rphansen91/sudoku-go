onmessage = function(e) {
    console.log('Message received from main script');
    const filtered = filterData(e.data[1], e.data[2])
    const normalized = normalizeData(filtered)
    const path = drawPath(normalized, e.data[3], e.data[4])
    console.log('Posting path back to main script');
    postMessage([e.data[0], path]);
}

const filterData = (rawData, samples = 5e3) => {
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      let blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
      }
      filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    return filteredData;
};
  
const normalizeData = (filteredData) => {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map((n) => n * multiplier);
};
  
const drawPath = (normalizedData, svgWidth, svgHeight) => {
    const width = svgWidth / normalizedData.length
    let path = `M 0 ${svgHeight / 2}`
    for (let i = 0; i < normalizedData.length; i++) {
      const x = i
      let height = normalizedData[i] * svgHeight - 20;
      if (height < 0) {
          height = 0;
      } else if (height > svgHeight / 2) {
          height = svgHeight / 2 - 10;
      }
      const isEven = (x + 1) % 2
      const y = isEven ? -height : height
      path += ` v ${y} a 1 1 0 0 ${isEven} ${width} 0 V ${svgHeight / 2}`
    }
    return path
  }
  