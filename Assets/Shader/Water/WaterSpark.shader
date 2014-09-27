Shader "Custom/WaterSpark" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
	}
	SubShader {
		Tags { "Queue" = "Transparent" "IgnoreProjector"="True" "RenderType"="Transparent" }
		Blend SrcAlpha OneMinusSrcAlpha
		AlphaTest Greater .01
		ColorMask RGB
		Cull Off Lighting Off ZWrite Off
		GrabPass {
			Name "BASE"
			Tags { "LightMode" = "Always" }
		}
		
		Pass {
			CGPROGRAM
	// Upgrade NOTE: excluded shader from DX11 and Xbox360; has structs without semantics (struct v2f members distortion)
	#pragma exclude_renderers d3d11 xbox360
			
			#pragma vertex vert
			#pragma fragment frag

			#include "UnityCG.cginc"

			sampler2D _MainTex;
			float4 _MainTex_ST;

			sampler2D _GrabTexture : register(s0);

			struct data {
				float4 vertex : POSITION;
				float3 normal : NORMAL;
				float4 texcoord : TEXCOORD0;
			};

			struct v2f {
				float4 position : POSITION;
				float4 screenPos : TEXCOORD0;
				float4 tex:TEXCOORD1;
				
			};

			v2f vert(data i){
				v2f o;
			    o.position = mul(UNITY_MATRIX_MVP, i.vertex);      // compute transformed vertex position
			    //o.uvmain = TRANSFORM_TEX(i.texcoord, _NoiseTex);   // compute the texcoords of the noise
			    o.screenPos = o.position;   // pass the position to the pixel shader
			    o.tex=i.texcoord;
			    return o;
			}

			half4 frag( v2f i ) : COLOR
			{  
			    // compute the texture coordinates
			    float2 screenPos = i.screenPos.xy / i.screenPos.w;   // screenpos ranges from -1 to 1

			    //screenPos.x = (screenPos.x + 1) * 0.5;   // I need 0 to 1
			    // /screenPos.y = (screenPos.y + 1) * 0.5;   // I need 0 to 1

			    // check if anti aliasing is used
			    //if (_ProjectionParams.x < 0)
			    	//screenPos.y = 1 - screenPos.y;

			    // get two offset values by looking up the noise texture shifted in different directions
			    //half4 offsetColor1 = tex2D(_NoiseTex, i.uvmain + _Time.xz*frequent);
			    //half4 offsetColor2 = tex2D(_NoiseTex, i.uvmain - _Time.yx*frequent);

			    // use the r values from the noise texture lookups and combine them for x offset
			    // use the g values from the noise texture lookups and combine them for y offset
			    // use minus one to shift the texture back to the center
			    // scale with distortion amount
			    //screenPos.x += ((offsetColor1.r + offsetColor2.r) - 1) * i.distortion;
			    //screenPos.y += ((offsetColor1.g + offsetColor2.g) - 1) * i.distortion;

			    //half4 col = tex2D( _GrabTexture, screenPos );
			    half4 col;
			    float4 mainTex = tex2D(_MainTex, i.tex.xy*_MainTex_ST.xy +_MainTex_ST.zw );
			    col=mainTex;
			     //i.tex.xy * _MainTex_ST.xy + _MainTex_ST.zw );
			    //col=float4(1,1,1,1);
			    //col.a = i.distortion;
			    col.a=col.a * ( 1 - abs( pow( (screenPos.x-0.2) *5,2) ) ) ;
			    return col;
			}
		ENDCG
		}
	} 
	FallBack "Diffuse"
}
