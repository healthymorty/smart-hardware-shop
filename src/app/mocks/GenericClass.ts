jest.mock('@mocks/GenericClass.mock');

const GenericClass 	= require('@mocks/GenericClass.mock');

const mMock = jest.fn();

GenericClass.mockImplementation(() => {

	return {

		m: mMock,

	};

});

export class MockGenericClass extends GenericClass {}
