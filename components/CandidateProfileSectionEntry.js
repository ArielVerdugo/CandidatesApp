import React from 'react';
import { View, Text } from 'react-native';

class CandidateProfileSectionEntry extends React.PureComponent {
    render() {
        const { title, info } = this.props;
        return (
            <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 16 }}>{title}</Text>
                <Text style={{ fontSize: 16 }}>{info}</Text>
            </View>
        );
    }
}

export default CandidateProfileSectionEntry;
