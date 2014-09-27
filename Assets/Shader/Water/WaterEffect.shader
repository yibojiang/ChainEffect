Shader "Custom/WaterEffect" {
	Properties {
		_MainTex ("Main Texture (RG)", 2D) = "white" {}
		_NoiseTex ("Noise Texture (RG)", 2D) = "white" {}
		strength("strength", Range(0.01, 0.5)) = 0.2
		frequent("frequent",Range(0.01,1))=0.5
		_Color("Color Tint", Color )=(1,1,1,1)
	}

	Category {
		Tags { "Queue" = "Transparent" }

		SubShader {
			Pass {
				Name "BASE"
				Tags { "LightMode" = "Always" }
				Lighting Off
				Cull Off
				ZWrite On
				ZTest LEqual
				Blend SrcAlpha OneMinusSrcAlpha
				AlphaTest Greater 0


				CGPROGRAM
				// Upgrade NOTE: excluded shader from DX11 and Xbox360; has structs without semantics (struct v2f members distortion)
				#pragma exclude_renderers d3d11 xbox360
				#pragma vertex vert
				#pragma fragment frag
				#pragma fragmentoption ARB_precision_hint_fastest
				#pragma fragmentoption ARB_fog_exp2
				#include "UnityCG.cginc"

				float4 _MainTex_ST;
				sampler2D _MainTex;

				float4 _NoiseTex_ST;
				sampler2D _NoiseTex;

				float strength;
				float frequent;
				float4 _Color;

				struct data {
					float4 vertex : POSITION;
					float3 normal : NORMAL;
					float4 texcoord : TEXCOORD0;
				};

				struct v2f {
					float4 position : POSITION;
					float4 screenPos : TEXCOORD0;
					float2 uvmain : TEXCOORD2;
					float4 tex:TEXCOORD3;
				};

				v2f vert(data i){
					v2f o;
				    o.position = mul(UNITY_MATRIX_MVP, i.vertex);      // compute transformed vertex position
				    o.uvmain = TRANSFORM_TEX(i.texcoord, _NoiseTex);   // compute the texcoords of the noise
				    o.screenPos = o.position;   // pass the position to the pixel shader
				    o.tex=i.texcoord;
				    return o;
				}

				half4 frag( v2f i ) : COLOR
				{  
				    // get two offset values by looking up the noise texture shifted in different directions
				    half4 offsetColor1 = tex2D(_NoiseTex, i.uvmain + _Time.xz*frequent);
				    half4 offsetColor2 = tex2D(_NoiseTex, i.uvmain - _Time.yx*frequent);

				    float2 offset=float2(((offsetColor1.r + offsetColor2.r) - 1)*strength , ((offsetColor1.g + offsetColor2.g) - 1)*strength  );
				    float4 mainTex = tex2D(_MainTex, float2(i.tex.x*(1+offset.x) , i.tex.y*(1+offset.y) ) +_MainTex_ST.zw );
				    half4 col=mainTex;
				    
				    col.a = 1;
				    return col*_Color;
				}
				ENDCG
			}	
		}	
	}
}
