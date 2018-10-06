#version 300 es
    precision highp float;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform int click;
    uniform int usegpu;
    out vec4 outColor;    

    #define PI 3.14

    mat2 rotate2d(float angle){
        return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
    }
    float zero(vec2 p,vec2 c){
        p-=c;
        float color=1.0;
        color*=step(19.0,sqrt(pow((p.x)*1.5,2.0)+pow(p.y,2.0)))+step(sqrt(pow((p.x)*1.5,2.0)+pow(p.y,2.0)),14.0);
        return color;
    }
    float one(vec2 p,vec2 c){
        p-=c;
        p.y+=3.0;
        float color=1.0;
        color*=clamp(step(p.y,-15.0)+step(20.0,p.y)+step(2.0,p.x)+step(p.x,-2.0),0.0,1.0);
        p-=vec2(1.0,20.0);
        p*=rotate2d( sin(PI/2.0) );
        color*=clamp(step(p.y,-15.0)+step(0.0,p.y)+step(2.0,p.x)+step(p.x,-2.0),0.0,1.0);
        return color;
    }
    float two(vec2 p,vec2 c){
        p-=c;
        p.y-=7.0;
        float color=1.0;
        color*=clamp(step(p.y,0.0)+step(11.0,sqrt(pow((p.x),2.0)+pow((p.y),2.0)))+step(sqrt(pow((p.x),2.0)+pow((p.y),2.0)),7.0),0.0,1.0);
        color*=clamp(step(p.x,6.0)+step(11.0,sqrt(pow((p.x),2.0)+pow((p.y)*1.3,2.0)))+step(sqrt(pow((p.x),2.0)+pow((p.y)*1.3,2.0)),7.0),0.0,1.0);
        color*=clamp(step(p.x,-10.0)+step(12.0,p.x)+step(-20.0,p.y)+step(p.y,-24.0),0.0,1.0);
        p-=-vec2(3.0,15.0);
        p*=rotate2d( sin(PI/4.0) );
        color*=clamp(step(p.y,-11.0)+step(15.0,p.y)+step(2.0,p.x)+step(p.x,-2.0),0.0,1.0);
        return color;
    }
    float three(vec2 p,vec2 c){
        p-=c;
        p.y-=10.0;
        float color=1.0;
        color*=clamp(step(p.y,0.0)*step(p.x,-3.0)+step(10.0,sqrt(pow((p.x),2.0)+pow((p.y)*1.1,2.0)))+step(sqrt(pow((p.x),2.0)+pow((p.y)*1.1,2.0)),6.0),0.0,1.0);
        p.y+=17.0;
        color*=clamp(step(0.0,p.y)*step(p.x,-3.0)+step(12.0,sqrt(pow((p.x),2.0)+pow((p.y)*1.1,2.0)))+step(sqrt(pow((p.x),2.0)+pow((p.y)*1.1,2.0)),8.0),0.0,1.0);
        return color;
    }
    float four(vec2 p,vec2 c){
        p-=c;
        p.y+=4.0;
        float color=1.0;
        color*=clamp(step(p.y,-15.0)+step(20.0,p.y)+step(2.0,p.x)+step(p.x,-2.0),0.0,1.0);
        color*=clamp(step(p.x,-18.0)+step(8.0,p.x)+step(-3.0,p.y)+step(p.y,-7.0),0.0,1.0);
        p-=vec2(-1.0,19.0);
        p*=rotate2d( sin(PI/5.0) );
        color*=clamp(step(p.y,-28.0)+step(0.0,p.y)+step(2.0,p.x)+step(p.x,-2.0),0.0,1.0);
        return color;
    }
    float five(vec2 p,vec2 c){
        p-=c;
        float color=1.0;
        p.y+=8.0;
        color*=clamp(step(0.0,p.y)*step(p.x,-7.0)+step(12.0,sqrt(pow((p.x),2.0)+pow((p.y)*1.1,2.0)))+step(sqrt(pow((p.x),2.0)+pow((p.y)*1.1,2.0)),8.0),0.0,1.0);
        color*=clamp(step(p.x,-8.0)+step(11.0,p.x)+step(23.0,p.y)+step(p.y,19.0),0.0,1.0);
        p-=vec2(-7.0,18.0);
        p*=rotate2d( sin(PI/25.0) );
        color*=clamp(step(p.y,-14.0)+step(4.0,p.y)+step(2.0,p.x)+step(p.x,-2.0),0.0,1.0);
        return color;
    }
    float six(vec2 p,vec2 c){
        p-=c;
        p.y+=2.0;
        float color=1.0;
        color*=clamp(step(p.y,9.0)*step(-8.0,p.x)+step(19.0,sqrt(pow((p.x)*1.5,2.0)+pow(p.y,2.0)))+step(sqrt(pow((p.x)*1.5,2.0)+pow(p.y,2.0)),14.0),0.0,1.0);
        color*=step(11.0,sqrt(pow((p.x+0.3)/1.05,2.0)+pow(p.y+5.5,2.0)))+step(sqrt(pow((p.x+0.3)/1.05,2.0)+pow(p.y+5.5,2.0)),7.0);
        return color;
    }
    float seven(vec2 p,vec2 c){
        p-=c;
        float color=1.0;
        color*=clamp(step(p.x,-16.0)+step(8.0,p.x)+step(14.0,p.y)+step(p.y,10.0),0.0,1.0);
        p-=vec2(7.0,15.0);
        p*=rotate2d( sin(PI/7.0) );
        color*=clamp(step(p.y,-39.0)+step(-2.0,p.y)+step(2.0,p.x)+step(p.x,-2.0),0.0,1.0);
        return color;
    }
    float eight(vec2 p,vec2 c){
        p-=c;
        p.y-=6.0;
        float color=1.0;
        color*=clamp(step(10.0,sqrt(pow((p.x),2.0)+pow((p.y)*1.1,2.0)))+step(sqrt(pow((p.x),2.0)+pow((p.y)*1.1,2.0)),6.0),0.0,1.0);
        p.y+=17.0;
        color*=clamp(step(12.0,sqrt(pow((p.x),2.0)+pow((p.y)*1.1,2.0)))+step(sqrt(pow((p.x),2.0)+pow((p.y)*1.1,2.0)),8.0),0.0,1.0);
        return color;
    }
    float nine(vec2 p,vec2 c){
        p-=c;
        p.y+=2.0;
        float color=1.0;
        color*=clamp(step(-9.0,p.y)*step(p.x,8.0)+step(19.0,sqrt(pow((p.x)*1.5,2.0)+pow(p.y,2.0)))+step(sqrt(pow((p.x)*1.5,2.0)+pow(p.y,2.0)),14.0),0.0,1.0);
        color*=step(11.0,sqrt(pow((p.x+0.3)/1.05,2.0)+pow(p.y-5.5,2.0)))+step(sqrt(pow((p.x+0.3)/1.05,2.0)+pow(p.y-5.5,2.0)),7.0);
        return color;
    }
    float period(vec2 p,vec2 c){
        p-=c;
        float color=1.0;
        p.y+=17.0;
        color*=step(3.0,length(p));
        return color;
    }
    float clearMark(vec2 p,vec2 c){
        p-=c;
        p.y+=2.0;
        p.x+=2.0;
        float color=1.0;
        color*=clamp(step(p.y,8.0)*step(-8.0,p.y)*step(0.0,p.x)+step(17.0,sqrt(pow((p.x)*1.2,2.0)+pow(p.y,2.0)))+step(sqrt(pow((p.x)*1.2,2.0)+pow(p.y,2.0)),12.0),0.0,1.0);
        return color;
    }

    float cpuMark(vec2 p,vec2 c){
        p-=c;
        p.y+=2.0;
        p.x+=31.0;
        float color=1.0;
        color*=clamp(step(p.y,8.0)*step(-8.0,p.y)*step(0.0,p.x)+step(17.0,sqrt(pow((p.x)*1.2,2.0)+pow(p.y,2.0)))+step(sqrt(pow((p.x)*1.2,2.0)+pow(p.y,2.0)),12.0),0.0,1.0);
        p.x-=26.0;
        color*=clamp(step(p.y,-18.0)+step(17.0,p.y)+step(-1.0,p.x)+step(p.x,-6.0),0.0,1.0);
        p.y-=6.0;
        p.x+=2.0;
        color*=clamp(step(p.x,-3.0)+step(19.0,sqrt(pow(p.x,2.0)+pow(p.y*2.0,2.0)))+step(sqrt(pow(p.x,2.0)+pow(p.y*2.3,2.0)),14.0),0.0,1.0);
        p.y+=1.0;
        p.x-=36.0;
        color*=clamp(step(10.0,p.y)+step(19.0,sqrt(pow((p.x)*1.5,2.0)+pow(p.y/1.2,2.0)))+step(sqrt(pow((p.x)*1.8,2.0)+pow(p.y/1.2,2.0)),15.0),0.0,1.0);
        return color;
    }
    float gpuMark(vec2 p,vec2 c){
        p-=c;
        p.y+=2.0;
        p.x+=31.0;
        float color=1.0;
        color*=clamp(step(p.y,8.0)*step(-2.0,p.y)*step(0.0,p.x)+step(17.0,sqrt(pow((p.x)*1.2,2.0)+pow(p.y,2.0)))+step(sqrt(pow((p.x)*1.2,2.0)+pow(p.y,2.0)),12.0),0.0,1.0);
        color*=clamp(step(p.x,-5.0)+step(14.0,p.x)+step(0.0,p.y)+step(p.y,-4.0),0.0,1.0);
        p.x-=26.0;
        color*=clamp(step(p.y,-18.0)+step(17.0,p.y)+step(-1.0,p.x)+step(p.x,-6.0),0.0,1.0);
        p.y-=6.0;
        p.x+=2.0;
        color*=clamp(step(p.x,-3.0)+step(19.0,sqrt(pow(p.x,2.0)+pow(p.y*2.0,2.0)))+step(sqrt(pow(p.x,2.0)+pow(p.y*2.3,2.0)),14.0),0.0,1.0);
        p.y+=1.0;
        p.x-=36.0;
        color*=clamp(step(10.0,p.y)+step(19.0,sqrt(pow((p.x)*1.5,2.0)+pow(p.y/1.2,2.0)))+step(sqrt(pow((p.x)*1.8,2.0)+pow(p.y/1.2,2.0)),15.0),0.0,1.0);
        return color;
    }

    float equalMark(vec2 p,vec2 c){
        p-=c;
        float color=1.0;
        color*=clamp(step(p.x,-20.0)+step(20.0,p.x)+step(12.0,p.y)+step(p.y,8.0),0.0,1.0);
        color*=clamp(step(p.x,-20.0)+step(20.0,p.x)+step(-8.0,p.y)+step(p.y,-12.0),0.0,1.0);
        return color;
    }
    float plusMark(vec2 p,vec2 c){
        p-=c;
        float color=1.0;
        color*=clamp(step(p.y,-20.0)+step(20.0,p.y)+step(2.0,p.x)+step(p.x,-2.0),0.0,1.0);
        color*=clamp(step(p.x,-20.0)+step(20.0,p.x)+step(2.0,p.y)+step(p.y,-2.0),0.0,1.0);
        return color;
    }
    float minusMark(vec2 p,vec2 c){
        p-=c;
        float color=1.0;
        color*=clamp(step(p.x,-20.0)+step(20.0,p.x)+step(2.0,p.y)+step(p.y,-2.0),0.0,1.0);
        return color;
    }
    float multiMark(vec2 p,vec2 c){
        p-=c;
        p*=rotate2d((PI/4.0));
        float color=1.0;
        color*=clamp(step(p.y,-20.0)+step(20.0,p.y)+step(2.0,p.x)+step(p.x,-2.0),0.0,1.0);
        color*=clamp(step(p.x,-20.0)+step(20.0,p.x)+step(2.0,p.y)+step(p.y,-2.0),0.0,1.0);
        return color;
    }
    float divisionMark(vec2 p,vec2 c){
        p-=c;
        float color=1.0;
        color*=clamp(step(p.x,-20.0)+step(20.0,p.x)+step(2.0,p.y)+step(p.y,-2.0),0.0,1.0);
        p.y-=17.0;
        color*=step(3.0,length(p));
        p.y+=34.0;
        color*=step(3.0,length(p));
        return color;
    }
    void main(void){
        vec2 p=gl_FragCoord.xy;
        vec3 color=vec3(224.0/255.0);
        color-=step(floor(resolution.y/5.0)*4.0,p.y)*(10.0/225.0);
        color*=step(p.x,floor(resolution.x/4.0)*3.0);
        color+=step(length(color),0.1)*vec3(255.0,142.0,0.0)/255.0;
        color*=clamp(step(floor(resolution.y/5.0)*4.0,p.y)+step(mod(p.y,floor(resolution.y/5.0)),floor(resolution.y/5.0)-1.0),0.0,1.0);
        color*=clamp(step(p.y,floor(resolution.y/5.0))*step(p.x,floor(resolution.x/4.0))+step(floor(resolution.x/4.0)*3.0,p.x)+step(mod(p.x,floor(resolution.x/4.0)),floor(resolution.x/4.0)-1.0),0.0,1.0);
        color+=step(length(color),0.1)*vec3(142.0)/255.0;
        color*=zero(p,vec2(resolution.x*0.125,resolution.y*0.1));
        color*=one(p,vec2(resolution.x*0.125,resolution.y*0.3));
        color*=two(p,vec2(resolution.x*0.375,resolution.y*0.3));
        color*=three(p,vec2(resolution.x*0.625,resolution.y*0.3));
        color*=four(p,vec2(resolution.x*0.125,resolution.y*0.5));
        color*=five(p,vec2(resolution.x*0.375,resolution.y*0.5));
        color*=six(p,vec2(resolution.x*0.625,resolution.y*0.5));
        color*=seven(p,vec2(resolution.x*0.125,resolution.y*0.7));
        color*=eight(p,vec2(resolution.x*0.375,resolution.y*0.7));
        color*=nine(p,vec2(resolution.x*0.625,resolution.y*0.7));
        color*=period(p,vec2(resolution.x*0.625,resolution.y*0.1));
        color*=clearMark(p,vec2(resolution.x*0.125,resolution.y*0.9));
        color*=float(1-usegpu)*gpuMark(p,vec2(resolution.x*0.375,resolution.y*0.9))+float(usegpu)*cpuMark(p,vec2(resolution.x*0.375,resolution.y*0.9));
        color+=1.0-equalMark(p,vec2(resolution.x*0.875,resolution.y*0.1));
        color+=1.0-plusMark(p,vec2(resolution.x*0.875,resolution.y*0.3));
        color+=1.0-minusMark(p,vec2(resolution.x*0.875,resolution.y*0.5));
        color+=1.0-multiMark(p,vec2(resolution.x*0.875,resolution.y*0.7));
        color+=1.0-divisionMark(p,vec2(resolution.x*0.875,resolution.y*0.9));
        vec2 m=mouse;
        m.y=resolution.y-mouse.y;
        color*=clamp(0.8+(1.0-float(click))+ (m.x <resolution.x/2.0 && m.y<resolution.y/5.0?step(floor(resolution.x/2.0),p.x)+step(floor(resolution.y/5.0),p.y):(step(m.x-mod(m.x,floor(resolution.x/4.0))+floor(resolution.x/4.0),p.x)+step(p.x,m.x-mod(m.x,floor(resolution.x/4.0))))+(step(m.y-mod(m.y,floor(resolution.y/5.0))+floor(resolution.y/5.0),p.y)+step(p.y,m.y-mod(m.y,floor(resolution.y/5.0))))),0.0,1.0);
        outColor=vec4(color,1.0);
    }