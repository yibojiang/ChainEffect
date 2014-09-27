Shader "Custom/Glow2" {
    Properties {
    	_MainTex ("Texture", 2D) = "white" {}
        _Color ("Color", Color) = (1,1,1,1)
    }
    SubShader {
        Tags { "Queue"="Transparent" }
        LOD 200
        ZTest Always
        Cull Off
        Blend One One
 
        CGPROGRAM
        #pragma surface surf Lambert
 
        float4 _Color;
        sampler2D _MainTex;
 
        struct Input {
        	float2 uv_MainTex;
            float3 viewDir;
            float3 worldNormal;
        };
 
        void surf (Input IN, inout SurfaceOutput o) {
            //o.Alpha = _Color.a * pow(abs(dot(normalize(IN.viewDir),
                //normalize(IN.worldNormal))),4.0);
            //o.Emission = _Color.rgb * o.Alpha;
            o.Albedo = tex2D (_MainTex, IN.uv_MainTex).rgb;
            o.Emission = _Color.rgb;
        }
        ENDCG
    }
    FallBack "Diffuse"
}