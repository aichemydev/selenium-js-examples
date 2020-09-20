"""
Sets up the React bank test package.

"""

__version__ = '1.0.0'

from setuptools import setup, find_packages


def readme():
    return 'No README yet.'


# run setup
setup(
    name='test_reactbank',
    version=__version__,
    description=('Python React Bank test.'),
    long_description=readme(),
    classifiers=[
        'Development Status :: 3 - Alpha',
        'License :: Other/Proprietary License',
        'Intended Audience :: Developers',
        "Operating System :: OS Independent",
        "Programming Language :: Python",
    ],
    keywords='testing, selenium',
    url='https://testgold.dev',
    author='Shivkumar Shivaji, Waqas Bhatti, Igor Golubenkov',
    license='Proprietary',
    packages=find_packages(),
    install_requires=[
        "selenium==3.141.0",
        "PyYAML==5.3.1",
        "pytest==6.0.1",
    ],
    include_package_data=True,
    zip_safe=False,
)
