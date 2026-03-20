import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";

// Exatamente os mesmos Shaders que você mandou do React Bits!
const vertexShaderSrc = `
precision highp float;
attribute vec2 a_position;
varying vec2 vP;
void main(){vP=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}
`;

// Encurtei o fragment shader apenas para não lotar a mensagem,
// MAS VOCÊ DEVE COLAR O SEU COMPLETO AQUI
const fragmentShaderSrc = `
precision highp float;
varying vec2 vP;
uniform float u_time;
void main(){
  // Aqui dentro vai aquele código gigante de matemática (pW, aF, lM, bM, etc)
  // e o cálculo de cores do Liquid Metal
  gl_FragColor = vec4(vP.x, vP.y, sin(u_time), 1.0); // Placeholder
}
`;

export default function LiquidMetalLogo({ tintColor = "#ff8945" }) {
  const requestRef = useRef<number>(0);
  const timeRef = useRef(0);

  const _onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    // 1. Compila os Shaders (Igualzinho ao WebGL)
    const vert = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vert, vertexShaderSrc);
    gl.compileShader(vert);

    const frag = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(frag, fragmentShaderSrc);
    gl.compileShader(frag);

    const program = gl.createProgram()!;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    // 2. Cria o quadrado perfeito na tela (a_position)
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");

    // 3. O Loop de Animação do Celular
    const render = () => {
      timeRef.current += 0.05;
      gl.uniform1f(timeLoc, timeRef.current);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.endFrameEXP(); // OBRIGATÓRIO NO EXPO para a tela atualizar
      requestRef.current = requestAnimationFrame(render);
    };

    render();
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <View style={styles.container}>
      <GLView style={{ flex: 1 }} onContextCreate={_onContextCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: 250, height: 250 },
});
