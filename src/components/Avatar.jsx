import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Avatar = (props) => {
    const { nodes, materials } = useGLTF('/avatar.glb');
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group {...props} dispose={null} ref={meshRef}>
            <primitive object={nodes.Scene} />
        </group>
    );
};

export default Avatar;

useGLTF.preload('/avatar.glb');
