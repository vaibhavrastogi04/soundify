import WaveSurfer from "wavesurfer.js";

const audioWaveform = WaveSurfer.create({
  container: ".waveForm",
  waveColor: "#FFFFFF",
  progressColor: "#B63636",
  url: "../../assets/songs/songs.opus",
  barGap: 2,
  barWidth: 2,
  barRadius: 2,
  barHeight: 0.5,
  renderFunction: (channels, ctx) => {
    const { width, height } = ctx.canvas;
    const scale = channels[0].length / width;
    const step = 10;

    ctx.translate(0, height / 2);
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();

    for (let i = 0; i < width; i += step * 2) {
      const index = Math.floor(i * scale);
      const value = Math.abs(channels[0][index]);
      let x = i;
      let y = value * height;

      ctx.moveTo(x, 0);
      ctx.lineTo(x, y);
      ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true);
      ctx.lineTo(x + step, 0);

      x = x + step;
      y = -y;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, y);
      ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false);
      ctx.lineTo(x + step, 0);
    }

    ctx.stroke();
    ctx.closePath();
  },
});
