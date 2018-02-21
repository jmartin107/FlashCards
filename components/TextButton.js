import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { blue } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {}, textColor = blue }) {

    let textStyle = {
        fontSize: 22,
        textAlign: 'center',
        color: textColor
    }

    return (
        <TouchableOpacity
            style={style}
            onPress={onPress}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    )

}
