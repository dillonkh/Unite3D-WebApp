import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UButton from './utilities/UButton';
import UTextInput from './utilities/UTextInput';
import UTextArea from './utilities/UTextArea';
import USelectDropdown from './utilities/USelectDropdown';
import ULogo from './utilities/ULogo';
import Page from './utilities/Page';

export default () => {
    return (
        <Page>
            <h1>UI Elements</h1>

            <h2 className={'h2'}>Buttons</h2>
            <Row>
                <Col>
                    <h4 className={'h4'}>Small, Medium (default), and Large Buttons</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'4'}>
                    <UButton onClick={() => {}} variant={'primary'} size={'sm'}>
                        Small
                    </UButton>
                </Col>
                <Col xs={'4'}>
                    <UButton onClick={() => {}} variant={'primary'}>
                        Medium
                    </UButton>
                </Col>
                <Col xs={'4'}>
                    <UButton onClick={() => {}} variant={'primary'} size={'lg'}>
                        Large
                    </UButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className={'h4'}>Primary</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary'}>
                        Primary
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary'} disabled>
                        Disabled
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary'} pill>
                        Pill
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary'} pill disabled>
                        Pill Disabled
                    </UButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className={'h4'}>Primary Outline</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary-outline'}>
                        Primary Outline
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary-outline'} disabled>
                        Disabled
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary-outline'} pill>
                        Pill
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary-outline'} pill disabled>
                        Pill Disabled
                    </UButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className={'h4'}>Secondary</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'secondary'}>
                        Secondary
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'secondary'} disabled>
                        Disabled
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'secondary'} pill>
                        Pill
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'secondary'} pill disabled>
                        Pill Disabled
                    </UButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className={'h4'}>Secondary Outline</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'secondary-outline'}>
                        Secondary
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'secondary-outline'} disabled>
                        Disabled
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'secondary-outline'} pill>
                        Pill
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'secondary-outline'} pill disabled>
                        Pill Disabled
                    </UButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className={'h4'}>Primary Alternate</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary-alt'}>
                        Primary Alternate
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary-alt'} disabled>
                        Disabled
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary-alt'} pill>
                        Pill
                    </UButton>
                </Col>
                <Col xs={'3'}>
                    <UButton onClick={() => {}} variant={'primary-alt'} pill disabled>
                        Pill Disabled
                    </UButton>
                </Col>
            </Row>
            <h2 className={'h2'}>Inputs</h2>
            <Row>
                <Col>
                    <h4 className={'h4'}>Text Input</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'2'}>
                    <UTextInput onClick={() => {}} placeholder='Default'></UTextInput>
                </Col>
                <Col xs={'2'}>
                    <UTextInput onClick={() => {}} number placeholder='Number'></UTextInput>
                </Col>
                <Col xs={'2'}>
                    <UTextInput onClick={() => {}} prepend='@' placeholder='Prepend'></UTextInput>
                </Col>
                <Col xs={'2'}>
                    <UTextInput onClick={() => {}} append='.com' placeholder='Append'></UTextInput>
                </Col>
                <Col xs={'2'}>
                    <UTextInput onClick={() => {}} number prepend='$' append='.00' placeholder='Both'></UTextInput>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className={'h4'}>Text Area</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'3'}>
                    <UTextArea rows='3' placeholder='variable number of rows (3)'></UTextArea>
                </Col>
                <Col xs={'3'}>
                    <UTextArea rows='5' placeholder='variable number of rows (5)'></UTextArea>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className={'h4'}>Drop Down</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'3'}>
                    <USelectDropdown
                        options={['one', 'two', 'three']}
                        placeholder='Dropdown'
                        onChange={() => {}}
                        onClick={() => {}}></USelectDropdown>
                </Col>
            </Row>
            <h2 className={'h2'}>Logos</h2>
            <Row>
                <Col>
                    <h4 className={'h4'}>Extruder</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'3'}>
                    <h5>Default (Black)</h5>
                    <ULogo height='300px'></ULogo>
                </Col>
                <Col xs={'3'}>
                    <h5>Purple</h5>
                    <ULogo color='purple' height='300px'></ULogo>
                </Col>
                <Col xs={'3'}>
                    <h5>White</h5>
                    <ULogo color='white' height='300px'></ULogo>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className={'h4'}>Long</h4>
                </Col>
            </Row>
            <Row className={'my-4'}>
                <Col xs={'3'}>
                    <h5>Default (Black)</h5>
                    <ULogo long height='300px'></ULogo>
                </Col>
            </Row>
        </Page>
    );
};
